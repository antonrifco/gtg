var curdate = new Date()
var TODAY = new Date()

function addMinutes(date, minutes) {
    return new Date(date.getTime() + minutes*60000);
}

function getSmallestStartDate(arrayDate, id_toignore) {
    d = new Date();
    d.setHours(23);
    d.setMinutes(59);
    m = {start : d};
    $.each(arrayDate, function(i,item){
        if(item.start <= m.start && item.id != id_toignore)
            m = item;
    });
    if(m.id == null) return null;
    else return m;
}

function getBiggestEndDate(arrayDate, id_toignore) {
    d = new Date();
    d.setHours(0);
    d.setMinutes(0);
    m = {end : d}
    $.each(arrayDate,function(i,item){
        if(item.end >= m.end && item.id != id_toignore)
            m = item;
    });
    if(m.id == null) return null; 
    else return m;
}

function getNextEvent(arrayEvent, event) {
    d = new Date();
    d.setHours(23);
    d.setMinutes(59);
    m = {start : d}
    $.each(arrayEvent,function(i,item){
        if(item.start > event.start && item.start <= m.start && event.id != item.id){
            m = item;
        }
    });
    if(m.id == null) { return null;  }
    else return m;
}

function getNextEventNotTravel(arrayEvent, event) {
    d = new Date();
    d.setHours(23);
    d.setMinutes(59);
    m = {start : d}
    $.each(arrayEvent,function(i,item){
        console.log('check is before: ' + event.start + ' < ' + item.start);
        if(item.start > event.start && item.start <= m.start && !isTravelEvent(item) && event.id != item.id)
            m = item;
    });
    if(m.id == null) { return null;  }
    else return m;
}

function getPreviousEvent(arrayEvent, event) {
    d = new Date();
    d.setHours(0);
    d.setMinutes(0);
    m = {start : d}
    $.each(arrayEvent,function(i,item){
        if(item.start < event.start && item.start >= m.start && event.id != item.id)
            m = item;
    });
    if(m.id == null) { return null;  }
    else return m;
}

function getPreviousEventNotTravel(arrayEvent, event) {
    d = new Date();
    d.setHours(0);
    d.setMinutes(0);
    m = {start : d}
    $.each(arrayEvent,function(i,item){
        if(item.start < event.start && item.start >= m.start && !isTravelEvent(item) && event.id != item.id)
            m = item;
    });
    if(m.id == null) { return null;  }
    else return m;
}

function unOverlap(arrayEvent, event){
    ret = $.extend({}, event);
    $.each(arrayEvent,function(i,item){
        if(item.id != event.id){
            if(!(item.start >= event.end || item.end <= event.start)){
                if(item.start < event.end && item.end > event.end){
                    console.log('geser atas')
                    gap_minute = (event.end.getTime() - item.start.getTime()) / 60000;
                    event.end = addMinutes(event.end, -1*gap_minute )
                    event.start = addMinutes(event.start, -1*gap_minute )           
                } else if(item.end > event.start && item.start < event.end){
                    console.log('geser bawah')
                    gap_minute = (item.end.getTime() - event.start.getTime()) / 60000;
                    event.end = addMinutes(event.end, gap_minute )
                    event.start = addMinutes(event.start, gap_minute )
                }
                return false;
            }
        }
    });
    return event;
}

function getEventOverlap(arrayEvent, event){
    m = null;
    $.each(arrayEvent,function(i,item){
        if(item.id != event.id){
            if(!(item.start >= event.end || item.end <= event.start)){
                m = item;
                return false;
            }
        }
    });
    return m;
}

function isEventOverlap(arrayEvent, event){
    ret = false;
    $.each(arrayEvent,function(i,item){
        if(item.id != event.id){
            if(!(item.start >= event.end || item.end <= event.start)){
                ret = true;
                return false;
            }
        }
    });
    return ret;
}

function isTwoEventOverlap(event1, event2){
    ret = false;
    if(!(event1.start >= event2.end || event1.end <= event2.start)){
        ret = true;
    }
    return ret;
}

function isEventPossibleToUnOverlap(arrayEvent, event){
    e = $.extend({}, event);
    e = unOverlap(arrayEvent, e);
    if(isEventOverlap(arrayEvent, e) || e.start.getHours() < 6 || e.end.getDate() != curdate.getDate()){
        console.log('cant unOverlap')
        return false;
    }
    return true;
}

function isEventExist(arrayEvent, event) {
    ret = false;
    $.each(arrayEvent,function(i,item){
        if(item.id == event.id){
            ret = true;
            return false;
        }
    });
    return ret;
}

function isTravelEvent(event) {
    return (event.type == 'travel');
}

function getTimestamp(){
    d = new Date();
    return d.getTime();
}

$(function() {
    $("#cover").show();
    $("#cover").click(function(){
        $("#cover").hide();
    });


    $('#catalog .live-tile').each(function() {
    
        // create an Event Object (http://arshaw.com/fullcalendar/docs/event_data/Event_Object/)
        // it doesn't need to have a start or end
        var eventObject = {
            title: $.trim($(this).attr("title")), // use the element's text as the event title
            id: $(this).attr("event_id"),
            event_id: $(this).attr("event_id"),
            duration: parseInt($(this).attr("activity_duration")),
            allDay: false,
            type: 'venue',
            editable: true
        };
        
        // store the Event Object in the DOM element so we can get to it later
        $(this).data('eventObject', eventObject);
        
        $(this).tooltip({
            content: $.trim($(this).attr("title")) + "<br/>Drag me to Itinerary...",
            position: {
                my: "center bottom-20",
                at: "center top",
                using: function( position, feedback ) {
                  $( this ).css( position );
                  $( "<div>" )
                    .addClass( "arrow" )
                    .addClass( feedback.vertical )
                    .addClass( feedback.horizontal )
                    .appendTo( this );
                }
            }
        });

        $(this).click(function(e) {
            $("#venue_container").slideDown('slow');
        });

        $(this).hover(function(e){
            $(this).css('cursor', 'move');
        });
        // make the event draggable using jQuery UI
        $(this).draggable({

            appendTo: "body",
            helper: function(event) {
                j = jQuery($(this));
                drag = j.find("img.full").clone().css('width','120px');
                drag.css('height','120px');
                
                return drag;
            },
            scroll: true,
            zIndex: 990,
            revert: true,      // will cause the event to go back to its
            revertDuration: 0,  //  original position after the drag
            cursor: "move", 
            cursorAt: { top: 55, left: 55 },
            // once the dragging starts, we decrease the opactiy of other items
            // Appending a class as we do that with CSS
            start:function (event, ui) {
                $(this).addClass("active");
                $(this).closest("#catalog").addClass("active");
            },
            // removing the CSS classes once dragging is over.
            stop:function (event, ui) {
                $(this).removeClass("active").closest("#catalog").removeClass("active");
            }
            
        });
        
    });


    $("body").click(function(e) {
        if (e.target.id == "map_container" || $(e.target).parents("#calendar").size() || $(e.target).parents("#map_container").size()) { 
            ;
        } else if (e.target.id == "venue_container" || $(e.target).parents("#venue_container").size()){
            ;
        } else if ($(e.target).parents("#venue").size()){
            ;
        } else {
            $("#venue_container:visible").slideUp();
            $("#map_container:visible").fadeOut();
        }
    });
    
    $(".live-tile").liveTile({pauseOnHover: true});
    
    $('#calendar').fullCalendar({
        header: {
            left: 'title',
            center: '',
            right: 'prev,next'
        },
        allDaySlot: false,
        height: 600,
        defaultView: 'agendaDay',
        editable: true,
        minTime:6,
        maxTime:24,
        slotMinutes: 30,
        events: [],
        theme: true,
        selectHelper: true,
        droppable: true, // this allows things to be dropped onto the calendar !!!
        eventAfterRender: function(event, element) {
            element.tooltip({
                content: (event.type == 'travel')?'Travel time':'One click venue to get details. and Double click to remove from your itinerary!',
                position: {
                    my: "center bottom-20",
                    at: "center top",
                    using: function( position, feedback ) {
                      $( this ).css( position );
                      $( "<div>" )
                        .addClass( "arrow" )
                        .addClass( feedback.vertical )
                        .addClass( feedback.horizontal )
                        .appendTo( this );
                    }
                }
            }),
            element.bind('dblclick', function() {
                console.log(event);
                if(event.type == 'travel')
                    return false;

                //remove event reconstruct travel event
                $( window ).attr('title','Are you sure to delete <br/>\'' + event.title + '\'?').dialog({
                    resizable: false,
                    height:140,
                    modal: true,
                    buttons: {
                        'Yes, Delete please': function() {
                            events_search = $('#calendar').fullCalendar('clientEvents',function(event_s) {
                                    return event_s.start.getDate() == curdate.getDate();
                                });
                            original_event = $.extend({}, event);
                            ori_prev_event_t = getPreviousEvent(events_search, original_event);
                            ori_next_event_t = getNextEvent(events_search, original_event);
                            console.log('bazinga')
                            del_bef = false; del_af = false;
                            if(ori_prev_event_t != null && isTravelEvent(ori_prev_event_t)){
                                console.log('removing travel before:' + ori_prev_event_t.id)
                                del_bef = true;
                                $('#calendar').fullCalendar('removeEvents',ori_prev_event_t.id);
                                events_search = $('#calendar').fullCalendar('clientEvents',function(event_s) {
                                    return event_s.start.getDate() == curdate.getDate();
                                });
                            }
                            if(ori_next_event_t != null && isTravelEvent(ori_next_event_t)){
                                console.log('removing travel after:' + ori_next_event_t.id)
                                del_af = true;
                                $('#calendar').fullCalendar('removeEvents',ori_next_event_t.id);

                                events_search = $('#calendar').fullCalendar('clientEvents',function(event_s) {
                                    return event_s.start.getDate() == curdate.getDate();
                                });
                            }

                            if(del_af || del_bef){
                                ori_prev_event = getPreviousEventNotTravel(events_search, original_event);
                                prev_event = getPreviousEventNotTravel(events_search, event);
                                ori_next_event = getNextEventNotTravel(events_search, original_event);
                                next_event = getNextEventNotTravel(events_search, event);
                                if(prev_event == null) next_event = {id: "dummy"}
                                if(next_event == null) next_event = {id: "dummy"}
                                if(ori_prev_event != null && ori_next_event != null && next_event.id != ori_next_event.id && prev_event.id != ori_prev_event.id){
                                    from = ori_prev_event.title;
                                    to = ori_next_event.title;
                                    gmaps_url = "http://maps.googleapis.com/maps/api/directions/json?origin="+encodeURIComponent(from)+",Singapore&destination="+encodeURIComponent(to)+",Singapore&sensor=false&mode=transit&departure_time="+Math.floor(new Date().getTime()/1000);
                                    $.getJSON(gmaps_url,
                                        function(data) {
                                            if(data.routes.length > 0){
                                                duration = Math.floor( parseInt(data.routes[0].legs[0].duration.value) / 60);
                                                duration_text = data.routes[0].legs[0].duration.text;
                                            }else{
                                                duration = 30
                                                duration_text = "Can't get estimated time"
                                            }
                                            
                                            event_travel = {
                                                    id : getTimestamp() + "_transport",
                                                    title : "Travel ["+duration_text+"]. Click for details!",
                                                    start : ori_prev_event.end,
                                                    end   : addMinutes(ori_prev_event.end, duration),
                                                    type: 'travel',
                                                    duration: duration,
                                                    allDay: false,
                                                    editable: false,
                                                    color: "#000000"
                                                }
                                            
                                            $('#calendar').fullCalendar( 'renderEvent', event_travel, true );
                                            events_search = $('#calendar').fullCalendar('clientEvents',function(event_s) {
                                                return event_s.start.getDate() == curdate.getDate();
                                            });
                                    });
                                }
                            }

                            $('#calendar').fullCalendar( 'removeEvents', event.id );

                            $(this).dialog('close');
                        },
                        Cancel: function() {
                            $(this).dialog('close');
                        }
                    }
                });
            });
        },
        drop: function(date, allDay) { // this function is called when something is dropped
    
            // retrieve the dropped element's stored Event Object
            var originalEventObject = $(this).data('eventObject');
            // we need to copy it, so that multiple events don't have a reference to the same object
            var copiedEventObject = $.extend({}, originalEventObject);
            
            // assign it the date that was reported
            copiedEventObject.start = date;
            copiedEventObject.id = curdate.getTime() + '_' + copiedEventObject.id;
            copiedEventObject.end = addMinutes(date, copiedEventObject.duration)
            copiedEventObject.allDay = allDay;
            
            sameDayEvents = $('#calendar').fullCalendar('clientEvents', function(event_s) {
                    return (event_s.start.getDate() == curdate.getDate());
                });
            //not yet exist, not overlapped AND estimated finish still in the same day
            if( !isEventExist(sameDayEvents, copiedEventObject) && copiedEventObject.end.getDay() == curdate.getDay()) {
                if(!isEventPossibleToUnOverlap(sameDayEvents, copiedEventObject)){
                    console.log('not possible to unoverlap')
                } else{
                    if(sameDayEvents.length != 0){
                        if(isEventOverlap(sameDayEvents, copiedEventObject)){
                            copiedEventObject = unOverlap(sameDayEvents, copiedEventObject);
                        }
                        


                        put_prev_event = getPreviousEvent(sameDayEvents, copiedEventObject);
                        put_next_event = getNextEvent(sameDayEvents, copiedEventObject);
                        if(put_prev_event != null && isTravelEvent(put_prev_event)){
                            $('#calendar').fullCalendar('removeEvents',put_prev_event.id);
                            sameDayEvents = $('#calendar').fullCalendar('clientEvents',function(event_s) {
                                return event_s.start.getDate() == curdate.getDate();
                            });
                        }
                        if(put_next_event != null && isTravelEvent(put_next_event)){
                            $('#calendar').fullCalendar('removeEvents',put_next_event.id);
                            sameDayEvents = $('#calendar').fullCalendar('clientEvents',function(event_s) {
                                return event_s.start.getDate() == curdate.getDate();
                            });
                        }





                        e_before = getPreviousEventNotTravel(sameDayEvents, copiedEventObject)
                        if(e_before != null) {
                            //there's event before
                            console.log('calculating travel event before:' + e_before.id)
                            from = e_before.title;
                            to = copiedEventObject.title;
                            event_t_before = {
                                id : getTimestamp() + "_transport",
                                title : "Travel [XXX]. Calculating travel time...",
                                start : e_before.end,
                                end   : addMinutes(e_before.end, 30),
                                allDay: false,
                                type: 'travel',
                                editable: false,
                                color: "#000000"
                            }
                        
                            $('#calendar').fullCalendar( 'renderEvent', event_t_before, true );

                            gmaps_url = "http://maps.googleapis.com/maps/api/directions/json?origin="+encodeURIComponent(from)+",Singapore&destination="+encodeURIComponent(to)+",Singapore&sensor=false&mode=transit&departure_time="+Math.floor(new Date().getTime()/1000);
                            console.log('google map:' + gmaps_url)
                            $.getJSON(gmaps_url,
                                function(data) {
                                    if(data.routes.length > 0){
                                        duration_g = Math.floor( parseInt(data.routes[0].legs[0].duration.value) / 60);
                                        duration_g_text = data.routes[0].legs[0].duration.text;
                                    }else{
                                        duration_g = 30
                                        duration_g_text = "Can't get estimated time"
                                    }
                                    event_t_before.end = addMinutes(e_before.end, duration_g);
                                    event_t_before.title = "Travel [" +duration_g_text+ "]. Click for details!"
                                                
                                    $('#calendar').fullCalendar( 'updateEvent', event_t_before );

                                    if(isTwoEventOverlap(event_t_before, copiedEventObject)){
                                        copiedEventObject.start = addMinutes(e_before.end, duration_g);
                                        copiedEventObject.end = addMinutes(e_before.end, duration_g + copiedEventObject.duration)
                                        $('#calendar').fullCalendar('updateEvent', copiedEventObject);
                                    }
                            });
                        }
                        
                        e_after = getNextEventNotTravel(sameDayEvents, copiedEventObject)
                        if(e_after != null) {
                            //there's event after
                            console.log('calculating travel event after:' + e_after.id)
                            from = copiedEventObject.title;
                            to = e_after.title;
                            event_t_after = {
                                id : getTimestamp() + "_transport",
                                title : "Travel [XXX]. Calculating travel time...",
                                start : addMinutes(e_after.start, -1 * 30),
                                end   : e_after.start,
                                allDay: false,
                                type: 'travel',
                                editable: false,
                                color: "#000000"
                            }
                            $('#calendar').fullCalendar( 'renderEvent', event_t_after, true );
                            gmaps_url = "http://maps.googleapis.com/maps/api/directions/json?origin="+encodeURIComponent(from)+",Singapore&destination="+encodeURIComponent(to)+",Singapore&sensor=false&mode=transit&departure_time="+Math.floor(new Date().getTime()/1000);
                            $.getJSON(gmaps_url,
                                function(data) {
                                    if(data.routes.length > 0){
                                        duration_g = Math.floor( parseInt(data.routes[0].legs[0].duration.value) / 60);
                                        duration_g_text = data.routes[0].legs[0].duration.text;
                                    }else{
                                        duration_g = 30
                                        duration_g_text = "Can't get estimated time"
                                    }
                                    event_t_after.start = addMinutes(e_after.start, -1 * duration_g);
                                    event_t_after.title = "Travel [" +duration_g_text+ "]. Click for details!"
                                    $('#calendar').fullCalendar( 'updateEvent', event_t_after );

                                    if(isTwoEventOverlap(event_t_after, copiedEventObject)){
                                        copiedEventObject.start = addMinutes(e_after.start, -1 * (duration_g + copiedEventObject.duration));
                                        copiedEventObject.end = addMinutes(e_after.start, -1 * duration_g)
                                        $('#calendar').fullCalendar('updateEvent', copiedEventObject);
                                    }
                            });
                        } 
                        
                    } 

                    $('#calendar').fullCalendar('renderEvent', copiedEventObject, true);
                }
            }
            
        },
        eventMouseover: function( event, jsEvent, view ) { 
            $("#calendar").attr("title", event.title);
        },
        eventDrop: function(event,dayDelta,minuteDelta,allDay,revertFunc) {
            //two events can't overlap
            var events_search = $('#calendar').fullCalendar('clientEvents',function(event_s) {
                        return event_s.start.getDate() == curdate.getDate();
                    });
            ok=true
            if(event.start.getHours() < 6 || event.end.getDay() != curdate.getDay()){
                ok=false;
                revertFunc();
            } 
            if(!isEventPossibleToUnOverlap(events_search, event)){
                console.log('not possible to unoverlap')
                revertFunc();
                ok=false;
            }
            
            //not overlap and there's other event / not only this event
            if(ok && events_search.length != 1){
                original_event = $.extend({}, event);
                original_event.start = addMinutes(original_event.start, -1 * minuteDelta);
                original_event.end = addMinutes(original_event.end, -1 * minuteDelta);
                ori_prev_event_t = getPreviousEvent(events_search, original_event);
                ori_next_event_t = getNextEvent(events_search, original_event);
                console.log('bazinga')
                del_bef = false; del_af = false;
                if(ori_prev_event_t != null && isTravelEvent(ori_prev_event_t)){
                    console.log('removing travel before:' + ori_prev_event_t.id)
                    del_bef = true;
                    $('#calendar').fullCalendar('removeEvents',ori_prev_event_t.id);
                    events_search = $('#calendar').fullCalendar('clientEvents',function(event_s) {
                        return event_s.start.getDate() == curdate.getDate();
                    });
                }
                if(ori_next_event_t != null && isTravelEvent(ori_next_event_t)){
                    console.log('removing travel after:' + ori_next_event_t.id)
                    del_af = true;
                    $('#calendar').fullCalendar('removeEvents',ori_next_event_t.id);

                    events_search = $('#calendar').fullCalendar('clientEvents',function(event_s) {
                        return event_s.start.getDate() == curdate.getDate();
                    });
                }

                if(del_af || del_bef){
                    ori_prev_event = getPreviousEventNotTravel(events_search, original_event);
                    prev_event = getPreviousEventNotTravel(events_search, event);
                    ori_next_event = getNextEventNotTravel(events_search, original_event);
                    next_event = getNextEventNotTravel(events_search, event);
                    if(prev_event == null) next_event = {id: "dummy"}
                    if(next_event == null) next_event = {id: "dummy"}
                    if(ori_prev_event != null && ori_next_event != null && next_event.id != ori_next_event.id && prev_event.id != ori_prev_event.id){
                        from = ori_prev_event.title;
                        to = ori_next_event.title;
                        gmaps_url = "http://maps.googleapis.com/maps/api/directions/json?origin="+encodeURIComponent(from)+",Singapore&destination="+encodeURIComponent(to)+",Singapore&sensor=false&mode=transit&departure_time="+Math.floor(new Date().getTime()/1000);
                        $.getJSON(gmaps_url,
                            function(data) {
                                if(data.routes.length > 0){
                                    duration = Math.floor( parseInt(data.routes[0].legs[0].duration.value) / 60);
                                    duration_text = data.routes[0].legs[0].duration.text;
                                }else{
                                    duration = 30
                                    duration_text = "Can't get estimated time"
                                }
                                
                                event_travel = {
                                        id : getTimestamp() + "_transport",
                                        title : "Travel ["+duration_text+"]. Click for details!",
                                        start : ori_prev_event.end,
                                        end   : addMinutes(ori_prev_event.end, duration),
                                        type: 'travel',
                                        duration: duration,
                                        allDay: false,
                                        editable: false,
                                        color: "#000000"
                                    }
                                
                                $('#calendar').fullCalendar( 'renderEvent', event_travel, true );
                                events_search = $('#calendar').fullCalendar('clientEvents',function(event_s) {
                                    return event_s.start.getDate() == curdate.getDate();
                                });
                        });
                    }
                }

                event = unOverlap(events_search, event);
                
                //first case: handle the event before this event
                e_before = getPreviousEvent(events_search, event);
                
                e_t_b = "dummy"; 
                if(e_before != null){
                    if(isTravelEvent(e_before)){
                        $('#calendar').fullCalendar('removeEvents',e_before.id);
                        e_before = getPreviousEventNotTravel(events_search, event);
                        events_search = $('#calendar').fullCalendar('clientEvents',function(event_s) {
                            return event_s.start.getDate() == curdate.getDate();
                        });
                    }
                    from = e_before.title;
                    to = event.title;
                    gmaps_url = "http://maps.googleapis.com/maps/api/directions/json?origin="+encodeURIComponent(from)+",Singapore&destination="+encodeURIComponent(to)+",Singapore&sensor=false&mode=transit&departure_time="+Math.floor(new Date().getTime()/1000);
                    $.getJSON(gmaps_url,
                        function(data) {
                            if(data.routes.length > 0){
                                duration = Math.floor( parseInt(data.routes[0].legs[0].duration.value) / 60);
                                duration_text = data.routes[0].legs[0].duration.text;
                            }else{
                                duration = 30
                                duration_text = "Can't get estimated time"
                            }
                            start_date_t = addMinutes(event.start, -1 * duration);
                            event_travel = {
                                    id : getTimestamp() + "_transport",
                                    title : "Travel ["+duration_text+"]. Click for details!",
                                    start : start_date_t,
                                    end   : event.start,
                                    type: 'travel',
                                    duration: duration,
                                    allDay: false,
                                    editable: false,
                                    color: "#000000"
                                }
                            
                            if(isEventOverlap(events_search, event_travel)){
                                e_before_travel = getEventOverlap(events_search, event_travel)
                                if(e_before_travel != null){
                                    gap_minute = (event.start.getTime() - e_before_travel.end.getTime()) / 60000;
                                    event_travel.start = e_before_travel.end;
                                    event_travel.end = addMinutes(event.start, duration - gap_minute);
                                    event.start = event_travel.end;
                                    event.end = addMinutes(event.end, duration - gap_minute);
                                    console.log('updating event from overlap with travel in before')
                                    $('#calendar').fullCalendar('updateEvent', event);
                                }
                            } 
                            e_t_b = event_travel.id;
                            $('#calendar').fullCalendar( 'renderEvent', event_travel, true );
                    });
                }

                //second case: handle event after this
                e_after = getNextEvent(events_search, event);
                if(e_after != null){
                    if(isTravelEvent(e_after)){
                        $('#calendar').fullCalendar('removeEvents',e_after.id);
                        e_after = getNextEventNotTravel(events_search, event);
                        events_search = $('#calendar').fullCalendar('clientEvents',function(event_s) {
                            return event_s.start.getDate() == curdate.getDate();
                        });
                    }
                    if(e_after != null){
                        from = event.title;
                        to = e_after.title;
                            gmaps_url = "http://maps.googleapis.com/maps/api/directions/json?origin="+encodeURIComponent(from)+",Singapore&destination="+encodeURIComponent(to)+",Singapore&sensor=false&mode=transit&departure_time="+Math.floor(new Date().getTime()/1000);
                            
                            $.getJSON(gmaps_url,
                                function(data) {
                                    if(data.routes.length > 0){
                                        duration = Math.floor( parseInt(data.routes[0].legs[0].duration.value) / 60);
                                        duration_text = data.routes[0].legs[0].duration.text;
                                    }else{
                                        duration = 30
                                        duration_text = "Can't get estimated time"
                                    }end_date_t = addMinutes(event.end, duration);
                                    event_travel = {
                                            id : getTimestamp() + "_transport",
                                            title : "Travel ["+duration_text+"]. Click for details!",
                                            start : event.end,
                                            end   : end_date_t,
                                            type: 'travel',
                                            duration: duration,
                                            allDay: false,
                                            editable: false,
                                            color: "#000000"
                                        }
                                    if(isEventOverlap(events_search, event_travel)){
                                        e_after_travel = getEventOverlap(events_search, event_travel);
                                        if(e_after_travel != null){
                                            gap_minute = (e_after_travel.start.getTime() - event.end.getTime()) / 60000;
                                            event_travel.end = e_after_travel.start;
                                            event_travel.start = addMinutes(event.end, (duration - gap_minute) * -1);
                                            event.start = addMinutes(event.start, (duration - gap_minute) * -1);
                                            event.end = event_travel.start
                                            console.log('updating event from overlap with travel in after')
                                            $('#calendar').fullCalendar('updateEvent', event);

                                            /*if(e_before != null){
                                                e_b_t = $('#calendar').fullCalendar('clientEvents',function(event_s) {
                                                    return (event_s.start.getDate() == curdate.getDate() && event_s.id == e_t_b);
                                                });
                                                if(e_b_t.length != 0){
                                                    console.log(e_b_t)
                                                    e_b_t.start = addMinutes(e_b_t.start, (duration - gap_minute) * -1);
                                                    e_b_t.end = event.start
                                                
                                                    $('#calendar').fullCalendar( 'updateEvent', e_b_t );
                                                }
                                            }*/
                                        }
                                        else 
                                            console.log('kosong euy')
                                    } 
                                    $('#calendar').fullCalendar( 'renderEvent', event_travel, true );
                            });
                    }
                }
            }

        },
        eventClick: function(event, element) {
            if(event.type == 'travel'){
                e_all = $('#calendar').fullCalendar('clientEvents',function(event_s) {
                    return event_s.start.getDate() == curdate.getDate();
                })
                from = getPreviousEvent(e_all, event).event_id;
                
                to = getNextEvent(e_all, event).event_id;

                directions.load("from: "+from+" to: " + to, {travelMode: G_TRAVEL_MODE_TRANSIT});
                $("#venue_container:visible").slideUp();
                $("#map_container").fadeIn("slow");
            } else if(event.type == 'venue'){
                $("#map_container:visible").fadeOut();
                $("#venue_container").slideDown('slow');
            }
        },
        eventResize: function( event, dayDelta, minuteDelta, revertFunc, jsEvent, ui, view ) { 
            ok=true
            if(event.start.getHours() < 6 || event.end.getDay() != curdate.getDay()){
                ok=false;
                revertFunc();
            } 
            var events_search = $('#calendar').fullCalendar('clientEvents',function(event_s) {
                return event_s.start.getDate() == curdate.getDate();
            });
            if(!isEventPossibleToUnOverlap(events_search, event)){
                console.log('not possible to unoverlap')
                revertFunc();
                ok=false;
            }
            if(ok){
                event = unOverlap(events_search, event);
                
            }
        }
    });

    //initially, previous day button is disabled
    $("#calendar .fc-button-prev").addClass("ui-state-disabled");

    $("#calendar .fc-button-prev").click(function() {
        console.log(curdate.getTime() + ' <= ' +  TODAY.getTime())
        if(!$("#calendar .fc-button-prev").hasClass("ui-state-disabled")){
            curdate.setDate(curdate.getDate() - 1);
            if(curdate.getTime() <= TODAY.getTime())
                $("#calendar .fc-button-prev").addClass("ui-state-disabled");
        }
    });
    $("#calendar .fc-button-next").click(function() {
        console.log(curdate.getTime() + ' > ' +  TODAY.getTime())
        if(!$("#calendar .fc-button-next").hasClass("ui-state-disabled")){
            curdate.setDate(curdate.getDate() + 1);
            if($("#calendar .fc-button-prev").hasClass("ui-state-disabled") && curdate.getTime() > TODAY.getTime())
                $("#calendar .fc-button-prev").removeClass("ui-state-disabled");
        }
    });


    var $container = $('#catalog');
    $container.isotope({
        // options...
        animationEngine:'best-available'
    });

    // filter items when filter link is clicked
    $('#options a').click(function(){
        // don't proceed if already selected
        if ( $(this).hasClass('selected') ) {
            return false;
        }
        var $optionSet = $(this).parents('.option-set');
        $optionSet.find('.selected').removeClass('selected');
        $(this).addClass('selected');

        var selector = $(this).attr('data-filter');
        $container.isotope({ filter: selector });
        return false;
    });
});