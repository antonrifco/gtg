<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html;charset=iso-8859-1"/>
    <title>Getourguide</title>
    <link rel="stylesheet" type="text/css" href="<?=base_url();?>/css/itinerary/humanity/jquery-ui-1.10.0.custom.css" />
    <script src="<?=base_url();?>/js/itinerary/jquery-1.8.2.js"></script>
    <script src="<?=base_url();?>/js/itinerary/jquery-ui.js"></script>
    <link rel="shortcut icon" href="https://a2.muscache.com/airbnb/static/logotype_favicon-6ba9bbe6f8ca077e990ca287d87b10b5.ico">
    
    <link rel="stylesheet" type="text/css" href="<?=base_url();?>/css/itinerary/fullcalendar.css">
    <link rel="stylesheet" type="text/css" href="<?=base_url();?>/css/itinerary/fullcalendar.print.css" media="print">
    <script type="text/javascript" src="<?=base_url();?>/js/itinerary/fullcalendar.min.js"></script>
	<script type="text/javascript" src="<?=base_url();?>/js/itinerary/jquery.isotope.js"></script>
	<script type="text/javascript" src="<?=base_url();?>/js/itinerary/metrojs.js"></script>
    <link rel="stylesheet" type="text/css" href="<?=base_url();?>/css/itinerary/metrojs.css"/>
    <link rel="stylesheet" type="text/css" href="<?=base_url();?>/css/itinerary/style2.css"/>
	
    <style>
	    #_gdir{font-size:14px;}
        #_gdir > div{font-weight:bold;text-align:center;}
        #_gdir p._sum{text-align:center;font-weight:bold;color:#3a741f;}
        #_gdir ol{padding:10px 30px 10px 40px;}
        #_gdir ol li{border-bottom:1px solid #ccc;}
        #_gdir ol li div p.r{font-size:11px;color:#3a741f;text-align:right;}
        #_gdir div._copy{font-size:12px;font-weight:normal;}

    </style>
	<script type="text/javascript" src="<?=base_url();?>/js/itinerary/itinerary.js"></script>
    <script type="text/javascript" src="http://gothere.sg/jsapi?sensor=false"></script>
    <script>
    	gothere.load("maps");
		gothere.setOnLoadCallback(initialize);
		var directions;
		function initialize() {
		    //$("#map_container").hide();
		    if (GBrowserIsCompatible()) {
		        // Create the Gothere map object.
		        var map = new GMap2(document.getElementById("map"));
		        // Set the center of the map.
		        map.setCenter(new GLatLng(1.362083, 103.819836), 11);
		        // Add zoom controls on the top left of the map.
		        map.addControl(new GSmallMapControl());
		        // Add a scale bar at the bottom left of the map.
		        map.addControl(new GScaleControl());
		        
		        directions = new GDirections(map, document.getElementById("panel"));
		        //directions.load("from: Changi Airport to: Orchard Road", {travelMode: G_TRAVEL_MODE_TRANSIT});
		        
		      }
		}
    </script>

</head>
<body>
<div id="cover">
	<img src="http://plnnr.com/static/images/applanding/browse_days.png" id="browse_days_tip" />
    <img src="http://plnnr.com/static/images/applanding/schedule.png" id="schedule_tip" />
    <img src="http://plnnr.com/static/images/applanding/routes.png" id="daily_routes_tip" />
    <img src="http://plnnr.com/static/images/applanding/refine.png" id="refine_tools_tip" />
    <img src="http://plnnr.com/static/images/applanding/start_plnnring.png" id="start_plnnring_button" />
</div>

<div id="header_top">
	<div class="container">
			<h1>
				<a href="index.html" title="Dilasag"><img src="<?=base_url();?>/images/logo.gif" alt="getourguide" /></a></h1>
			<ul class="menu fr">
			  <li class="active"><a href="index.html" title="Home">Home</a></li>
				<li><a href="guide_registration.html" title="Be a Guide">Be a Guide</a></li>
				<li><a href="gallery.html" title="Gallery">Gallery</a></li>
				<li><a href="blog.html" title="Blog">Blog</a></li>
				<li><a href="contact-us.html" title="Contact Us">Contact Us</a></li>
			</ul>
	</div>
</div><!-- // end #header -->


<div class="advsearch leftmenu">
	<div class="colleft">
		<div class="result_container">
			<div id="map_container">
        		<div id="map" style="width:670px;height:550px;margin-right:10px;float:left;"></div>
        		<div id="panel" style="width:310px; height:550px;float:left;"></div>
    
		    </div>
		    <div id="venue_container">
		    	<div class="venue_rating">
		    		<img src="<?=base_url();?>/images/raty/star-on-big.png"/>
                	<img src="<?=base_url();?>/images/raty/star-on-big.png"/>
                	<img src="<?=base_url();?>/images/raty/star-on-big.png"/>
                	<img src="<?=base_url();?>/images/raty/star-on-big.png"/>
                	<img src="<?=base_url();?>/images/raty/star-half-big.png"/>
		    	</div>
		    	<div class="venue_title">Orchard</div>
		    	<section id="options" class="clearfix venue_options">
				    <ul class="option-set clearfix">
				      	<li><a href="#" data-filter="*" class="selected" >General Info</a></li>
				      	<li><a href="#" data-filter=".historical">Nearby Food</a></li>
				      	<li><a href="#" data-filter=".shopping">Nearby Praying House</a></li>
				    </ul>
			    </section> <!-- #options -->
			    <div id="venue_detail">
			    	<p>
			    	See exotic and endangered animals up close in their natural habitats in the Singapore Zoo. Voted the best attraction in Singapore on Trip Advisor, and considered one of the best zoos in the world, this attraction is a must see, housing over 2500 mammals, birds and reptiles.</p>

<p>Have a memorable Wild Breakfast with the Oriental small-clawed otter, reticulated python or the well-loved orang-utans (S$15.80 for adults and S$11.50 for children). Watch as the orang-utans swing effortlessly from one hold to another in their free-ranging areas. Get a better look at these primates at the boardwalk or take a picture with these apes during their feeding sessions at the Island free-ranging area at 11.30 am and 3.30 pm, or the Boardwalk free-ranging area at 2.15 pm and 4.30 pm respectively.</p>

<p>Hop aboard the Elephant Rides for an unforgettable and thrilling ride, or provide the children with bragging rights as they climb aboard the Pony Rides. Other ways to tour the park include the Horse-carriage, boat rides, or the tram, for a quicker and more efficient way to see the park in its entirety.</p>

<p>Other highlights of the zoo include the Fragile Forest, a rainforest ecosystem, and the Bat Exhibit with bats that have a wingspan of 1.7 m. Catch a glimpse of flying squirrels in the Giant Flying Squirrel Exhibit and watch squirrels soar 400 m above the ground.</p>

<p>Visit the animals in their natural habitats. Check out the Elephants of Asia, a one-hectare exhibit featuring the animal and its various historical and cultural associations. This exhibit, designed for the overall comfort of the elephants, has a mud wallow, viewing loft, bathing pool and has several thatched huts inspired by Myanmar's architecture. Walk through the eco-habitat on the elevated boardwalks to observe the elephants' behaviour and check out the amazing views of the reservoir. Educate yourself about elephants and their role in non-destructive logging operations in rainforests.</p>

<p>Animals from all over the world can be found in the Singapore Zoo. Meet the inhabitants of Australia, Africa, and even the Arctic Circle. You can visit the Australian outback to see grey kangaroos and wallabies wandering about freely and even feed them during their feeding sessions at 11 am and 4 pm. Check out the rustic sheds nearby, featuring a range of reptiles native to Australia. Be sure to look out for the more exotic reptiles such as the frill-necked lizard, the bearded dragon and the carpet python. If you're lucky enough, you might even be able to catch the notoriously shy sugar gliders. Another must-see is the cassowary with its signature vibrant and intimidating helmet.</p>

<p>Be sure to also visit the magnificent African lions in their enclosures. If you want a more personal encounter with the lions, you could actually choose to participate in the Lunch with Lions event, an event that won the Bronze Award for innovation in the International Festivals and Events Association's Pinnacle Awards in 2000. Embark on the adventure, arranged exclusively for only 15 to 21 guests, by boarding the tram which will take you into the heart of Wild Africa and to the Tropical Crops Plantation, providing you with stunning views of the tranquil Seletar Reservoir. Sip on a welcome cocktail before being ushered into the lion viewing gallery, where you will dine alongside the lions. Feast on a sumptuous buffet spread with amazing variety of cold and hot foods, appetizers, vegetables and eventually dessert, accompanied by unparalleled views of the majestic lions.</p>

Admission Rates:
<p>Should you visit on your birthday, you would be eligible for free entry if you show a form of identification and will also be eligible to enjoy other benefits.</p>

Adult – S$20.00
Child (3 to 12 years old) – S$13.00
Child (Below 3 years old) – Free
Senior Citizens (Singaporeans and Permanent Residents aged 60 & above) – S$10

<p>'Park Hopper' special packages for the Singapore Zoo, Night Safari and Jurong Bird Park are also available, where visits to the three parks need not be in one day.</p>

<p>You may also wish to purchase the 'Zoo-per Saver' special package for unlimited boat and tram rides, including the zoo's admission fee.</p>

<p>Renowned for its 'open zoo' concept and featuring 2,500 specimens from 315 species of animals, the Singapore Zoo is a must-see on any visitors' itinerary.</p>
			    </div>
			</div>
		    <div id="city">Singapore</div>
    	    <section id="options" class="clearfix">
			    <ul id="sort-by" class="option-set clearfix" data-option-key="sortBy">
			      	<li><a href="#" data-filter="*" class="selected" >Show all</a></li>
			      	<li><a href="#" data-filter=".historical">Historical</a></li>
			      	<li><a href="#" data-filter=".shopping">Shopping</a></li>
			      	<li><a href="#" data-filter=".modern">Modern</a></li>
			    </ul>

			</section> <!-- #options -->

            <div id="catalog">
                
            	<div id="venue" class="live-tile magenta shopping" data-delay="-1" data-initdelay="-1" event_id="238863" activity_duration="90" title="Orchard Road">
                    <span class="tile-title">Orchard Road</span>
                    <div><img class="full" src="<?=base_url();?>/images/photo/habibi.jpg"/></div>
                    <div>
                        <p class="full">
                        	<img src="<?=base_url();?>/images/raty/star-on.png"/>
                        	<img src="<?=base_url();?>/images/raty/star-on.png"/>
                        	<img src="<?=base_url();?>/images/raty/star-on.png"/>
                        	<img src="<?=base_url();?>/images/raty/star-on.png"/>
                        	<img src="<?=base_url();?>/images/raty/star-half.png"/>
                        	<i>"Good place to hangout"</i>
                        </p>
                    </div>
                </div>
                <div id="venue" class="live-tile blue historical" data-delay="-1" data-initdelay="-1" data-mode="flip" event_id="619795" activity_duration="210" title="Chinese Garden">    
                    <span class="tile-title">Chinese Garden</span>
                    <div><img class="full" src="<?=base_url();?>/images/photo/budi.jpg"/></div>
                    <div>
                        <p class="full">
                        	<img src="<?=base_url();?>/images/raty/star-on.png"/>
                        	<img src="<?=base_url();?>/images/raty/star-on.png"/>
                        	<img src="<?=base_url();?>/images/raty/star-on.png"/>
                        	<img src="<?=base_url();?>/images/raty/star-on.png"/>
                        	<img src="<?=base_url();?>/images/raty/star-off.png"/>
                        	<i>"Good place to hangout"</i>
                        </p>
                    </div>
                </div>
                <div id="venue" class="live-tile red shopping" data-delay="-1" data-initdelay="-1" data-mode="flip" event_id="168732" activity_duration="90" title="Tiong Bahru Plaza">    
                    <span class="tile-title">Tiong Bahru Plaza</span>
                    <div><img class="full" src="<?=base_url();?>/images/photo/budi.jpg"/></div>
                    <div>
                        <p class="full">
                        	<img src="<?=base_url();?>/images/raty/star-on.png"/>
                        	<img src="<?=base_url();?>/images/raty/star-on.png"/>
                        	<img src="<?=base_url();?>/images/raty/star-on.png"/>
                        	<img src="<?=base_url();?>/images/raty/star-on.png"/>
                        	<img src="<?=base_url();?>/images/raty/star-half.png"/>
                        	<i>"Good place to hangout"</i>
                        </p>
                    </div>
                </div>
                    
                <div id="venue" class="live-tile teal modern" data-delay="-1" data-initdelay="-1" data-mode="flip" event_id="018956" activity_duration="120" title="Marina Bay Sands">    
                    <span class="tile-title">Marina Bay Sands</span>
                    <div><img class="full" src="<?=base_url();?>/images/photo/budi.jpg"/></div>
                    <div>
                        <p class="full">
                        	<img src="<?=base_url();?>/images/raty/star-on.png"/>
                        	<img src="<?=base_url();?>/images/raty/star-on.png"/>
                        	<img src="<?=base_url();?>/images/raty/star-on.png"/>
                        	<img src="<?=base_url();?>/images/raty/star-on.png"/>
                        	<img src="<?=base_url();?>/images/raty/star-half.png"/>
                        	<i>"Good place to hangout"</i>
                        </p>
                    </div>
                </div>
                <div id="venue" class="live-tile brown modern" data-delay="-1" data-initdelay="-1" data-mode="flip" event_id="098588" activity_duration="90" title="Sentosa Island">    
                    <span class="tile-title">Sentosa Island</span>
                    <div><img class="full" src="<?=base_url();?>/images/photo/budi.jpg"/></div>
                    <div>
                        <p class="full">
                        	<img src="<?=base_url();?>/images/raty/star-on.png"/>
                        	<img src="<?=base_url();?>/images/raty/star-on.png"/>
                        	<img src="<?=base_url();?>/images/raty/star-on.png"/>
                        	<img src="<?=base_url();?>/images/raty/star-on.png"/>
                        	<img src="<?=base_url();?>/images/raty/star-half.png"/>
                        	<i>"Good place to hangout"</i>
                        </p>
                    </div>
                </div>
                <div id="venue" class="live-tile mango modern" data-delay="-1" data-initdelay="" data-mode="flip" event_id="049835" activity_duration="300" title="Boat Quay">    
                    <span class="tile-title">Boat Quay</span>
                    <div><img class="full" src="<?=base_url();?>/images/photo/budi.jpg"/></div>
                    <div>
                        <p class="full">
                        	<img src="<?=base_url();?>/images/raty/star-on.png"/>
                        	<img src="<?=base_url();?>/images/raty/star-on.png"/>
                        	<img src="<?=base_url();?>/images/raty/star-on.png"/>
                        	<img src="<?=base_url();?>/images/raty/star-on.png"/>
                        	<img src="<?=base_url();?>/images/raty/star-half.png"/>
                        	<i>"Good place to hangout"</i>
                        </p>
                    </div>
                </div>

                <div id="venue" class="live-tile green historical" data-delay="-1" data-initdelay="-1" data-mode="flip" event_id="049178" activity_duration="60" title="Fullerton Hotel">    
                    <span class="tile-title">Fullerton Hotel</span>
                    <div><img class="full" src="<?=base_url();?>/images/photo/budi.jpg"/></div>
                    <div>
                        <p class="full">
                        	<img src="<?=base_url();?>/images/raty/star-on.png"/>
                        	<img src="<?=base_url();?>/images/raty/star-on.png"/>
                        	<img src="<?=base_url();?>/images/raty/star-on.png"/>
                        	<img src="<?=base_url();?>/images/raty/star-on.png"/>
                        	<img src="<?=base_url();?>/images/raty/star-half.png"/>
                        	<i>"Good place to hangout"</i>
                        </p>
                    </div>
                </div>
                <div id="venue" class="live-tile blue modern" data-delay="-1" data-initdelay="-1" data-mode="flip" event_id="098585" activity_duration="150" title="Vivo City">    
                    <span class="tile-title">Vivo City</span>
                    <div><img class="full" src="<?=base_url();?>/images/photo/budi.jpg"/></div>
                    <div>
                        <p class="full">
                        	<img src="<?=base_url();?>/images/raty/star-on.png"/>
                        	<img src="<?=base_url();?>/images/raty/star-on.png"/>
                        	<img src="<?=base_url();?>/images/raty/star-on.png"/>
                        	<img src="<?=base_url();?>/images/raty/star-on.png"/>
                        	<img src="<?=base_url();?>/images/raty/star-half.png"/>
                        	<i>"Good place to hangout"</i>
                        </p>
                    </div>
                </div>
                <div id="venue" class="live-tile lime modern" data-delay="-1" data-initdelay="-1" data-mode="flip" event_id="059815" activity_duration="150" title="Clarke Quay">    
                    <span class="tile-title">Clarke Quay</span>
                    <div><img class="full" src="<?=base_url();?>/images/photo/budi.jpg"/></div>
                    <div>
                        <p class="full">
                        	<img src="<?=base_url();?>/images/raty/star-on.png"/>
                        	<img src="<?=base_url();?>/images/raty/star-on.png"/>
                        	<img src="<?=base_url();?>/images/raty/star-on.png"/>
                        	<img src="<?=base_url();?>/images/raty/star-on.png"/>
                        	<img src="<?=base_url();?>/images/raty/star-half.png"/>
                        	<i>"Good place to hangout"</i>
                        </p>
                    </div>
                </div>
            </div>

		</div>
		<div class="col2">
			<!-- Column 2 start -->
            <!-- Todo: Put tabbed container here. for multiple days itinerary -->
            <div id='calendar'></div>
			
			<!-- Column 2 end -->
		</div>
	</div>
</div>



<div id="footer">
	<div class="container">
		<ul class="menu fl">
			<li><img src="<?=base_url();?>/images/twitter.png" title="Post to twitter"/></li>
			<li><img src="<?=base_url();?>/images/facebook.png" title="Post to Facebook"/></li>
			<li><img src="<?=base_url();?>/images/google.png" title="Post to Google+"/></li>
			<li><a href="contact-us.html" title="Contact Us">Contact Us</a></li>
		</ul>
		<p>&copy; Treshno Tech, Pte. Ltd. 2013</p>
	</div>
</div><!-- // end #fppter -->
</body>
</html>