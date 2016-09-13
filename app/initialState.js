/**
 * Created by Andy Likuski on 2016.05.23
 * Copyright (c) 2016 Andy Likuski
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import {OrderedMap, Map, List} from 'immutable'
import Statuses from './statuses'
import * as settingsActions from './actions/settings'

var amtrakStandardModels = OrderedMap({
    'AMTRAK Superliner': Map({
        status: Statuses.INITIALIZED,
        id: '2b495238-e77d-4edf-bb23-b186daf0640f',
        scenes: OrderedMap({ entries: Map({
            'Outside': Map({
                anchorId: 'id.5ktmpvprnx88',
            }),
            'Coach Car': Map({
                anchorId: 'id.5wakjfozuf8l',
            }),
        })}),
        media: OrderedMap({
            'Capitol Corridor Interior': Map({
                caption: "Northern California's Capitol Corridor",
                sourceImageUrl: 'http://photos.everintransit.com/US-California/Sacramento/i-ZdzL7CV/0/M/sacramento-0138-M.jpg',
                sourceUrl: 'http://www.everintransit.com/capitol-corridor-amtrak-california/',
                credit: 'Ever In Transit'
            }),
            'AMTRAK Superliner Cafe Lounge Car': Map({
                caption: 'Casual food is available on most AMTRAK trains',
                sourceImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/0a/Amtrak_Superliner_Cafe_Lounge_car.jpg',
                sourceUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/0a/Amtrak_Superliner_Cafe_Lounge_car.jpg',
                credit: 'Wikimedia'
            }),
            'AMTRAK Superliner Dining Car': Map({
                caption: 'Hot breakfast in the dining car on the northbound Coast Starlight',
                sourceUrl: 'http://rescapes.net/',
                credit: 'Rescape',
                date: 'October 2015'
            }),
            'AMTRAK Superliner Fraser Winter Park': Map({
                caption: 'Chicago Zephyr Passengers take a brake at the Fraser/Winter Park AMTRAK Station',
                sourceUrl: 'http://rescapes.net',
                credit: 'Rescape',
                date: 'November 2015'
            }),
            'AMTRAK Superliner Colorado': Map({
                caption: "AMTRAK's Chicago Zephyr offers stunning scenery in the Colorado Rockies",
                sourceUrl: 'http://rescapes.net',
                credit: 'Rescape',
                date: 'November 2015'
            }),
            'AMTRAK Coast Starlight Parlour Car': Map({
                caption: "AMTRAK's Coast Starlight first class parlour car offers the height of travel luxury on a quasi-publicly-operated train",
                sourceImageUrl: 'http://www.trainsandtravel.com/wp-content/uploads/2015/07/Parlour-Car-copy-1090x818.jpg',
                sourceUrl: 'http://www.trainsandtravel.com/the-nickel-and-diming-continues/',
                credit: 'Tranis & Travel with Jim Loomis',
                date: 'July 2015'
            })
        })

    }),
    'AMTRAK Café Car': Map({
        status: Statuses.INITIALIZED,
        id: '9b7bbfe8-2ad5-4074-ae81-7bc0645dfce9',
        scenes: OrderedMap({ entries: Map({
            'Seating': Map({
                anchorId: 'id.bc4p3rsjqez8'
            }),
            'Offerings': Map({
                anchorId: 'id.wcuwoy7h102u'
            }),
            'Group Seating': Map({
                anchorId: 'id.5ev15ggtfpz4'
            }),
        })}),
        media: OrderedMap({
            'Eastern Cafe Tables': Map({
                caption: 'Eastern AMTRAK Café Car tables with bike space',
                sourceImageUrl: 'http://www.bikenyc.org/sites/default/files/Bikes%20On%20Board%20Between%20ALB%20%26%20SDY.JPG',
                sourceUrl: 'http://www.bikenyc.org/blog/bikes-amtrak-trains-northeast-nyc-summer',
                credit: 'Bike NYC'
            }),
            'Western Cafe Tables': Map({
                caption: 'Western AMTRAK Café Car tables',
                sourceImageUrl: 'http://photos.everintransit.com/US-California/Sacramento/i-CHSJLNj/0/M/sacramento-091445-M.jpg',
                sourceUrl: 'http://www.everintransit.com/capitol-corridor-amtrak-california/',
                credit: 'Ever In Transit'
            }),
            'San Joaquin Cafe Car': Map({
                caption: "Café Car of AMTRAK's Central California service",
                sourceImageUrl: 'https://www.flickr.com/photos/hercwad/3592097342/',
                sourceUrl: 'http://www.flickriver.com/photos/hercwad/3592097342/',
                credit: 'Chris (Flickr Handle LA Wad)'
            }),
            'Cafe Car Service': Map({
                caption: "Café Car Service on AMTRAK's Northern California Capitol Corridor",
                sourceImageUrl: 'http://ww3.hdnux.com/photos/07/63/06/2044314/5/1024x1024.jpg',
                sourceUrl: 'http://www.sfgate.com/bayarea/article/Calif-Amtrak-ridership-rising-on-state-trains-2479851.php#photo-2044314',
                credit: 'Carlos Avila Gonzalez, The San Francisco Chronicle'
            }),
            'Cafe Car Lounge Area': Map({
                caption: "Café Car Lounge Area on AMTRAK's Central California San Joaquin",
                sourceImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Passengers_in_Amtrak_lounge_car_of_San_Joaquin_%28train%29_2014.jpg',
                sourceUrl: 'https://commons.wikimedia.org/w/index.php?curid=42379331',
                credit: 'George Garrigues, CC BY-SA 3.0',
            }),
            'Deutsche Bahn Bordbistro': Map({
                caption: "Germany's Deutsche Bahn serves food and drinks on intercity high-speed and regional trains",
                sourceImageUrl: 'http://www.spiegel.de/#ref=gallery-last-image',
                sourceUrl: 'http://www.spiegel.de/fotostrecke/bahn-millionen-investition-fuer-kaffeetrinker-fotostrecke-56176-3.html',
                credit: 'Der Spiegel'
            })
        })
    }),

    'Fixed-Guideways': Map({
        status: Statuses.INITIALIZED,
        id: '419df1d2-949f-4e60-adbc-59da24a5c6ce',
        scenes: OrderedMap({ entries: Map({
            'All Transit': Map({
                anchorId: 'id.2y8fqiblaq2h'
            }),
            'Fixed Guideway': Map({
                anchorId: 'id.fxqrlhz9p7by'
            }),
            'Not Fixed Guideway': Map({
                anchorId: 'id.5dezdsk8y4kg'
            }),
        })}),
        media: OrderedMap({
            'St Charles Streetcar': Map({
                caption: "The venerable New Orleans Saint Charles Streetcar saunters along tree and grass-lined tracks",
                sourceImageUrl: 'http://i0.wp.com/gonola.com/images/Saint-Charles-streetcar.jpg?w=510',
                sourceUrl: 'http://gonola.com/2012/12/11/make-a-day-of-riding-the-saint-charles-streetcar.html',
                credit: 'Hotels.com'
            }),
            'Ghent Trams and Public Life': Map({
                caption: "Trams in Ghent, Belgium predictably slide through public space on fixed guideways",
                sourceUrl: 'http://rescapes.net',
                credit: 'Rescape',
                date: 'July 2016'
            }),
            'Bordeaux Tramway': Map({
                caption: "Trams in Bordeaux, France are powered by a safe, inductive power source between the tracks, eliminating overhead wires downtown",
                sourceUrl: 'http://rescapes.net',
                credit: 'Rescape',
                date: 'July, 2010'
            }),
            'Bordeaux Tramway Tracks': Map({
                caption: "The inductive power source for trams in Bordeaux, France is likely the future wireless option for many trams and some buses, if not on-board batteries",
                sourceUrl: 'http://rescapes.net',
                credit: 'Rescape',
                date: 'July, 2010'
            }),
            'Nantes Busway': Map({
                caption: "Bus Rapid Transit Service in Nantes, France with dedicated right-of-way, but not fixed guideway",
                sourceImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Flickr_-_IngolfBLN_-_Nantes_-_Busway_-_Ligne_4_-_Duchesse_Anne_-_Ch%C3%A2teau_des_Ducs_de_Bretagne_%281%29.jpg/1920px-Flickr_-_IngolfBLN_-_Nantes_-_Busway_-_Ligne_4_-_Duchesse_Anne_-_Ch%C3%A2teau_des_Ducs_de_Bretagne_%281%29.jpg',
                sourceUrl: 'https://en.wikipedia.org/wiki/Nantes_Busway',
                credit: 'IngolfBLN'
            }),
            'Los Angeles Orange Line BRT': Map({
                caption: "BRT busline built upon Southern Pacific Railroad's former Burbank Branch Line. This uncomfortable, overcrowded bus will now be upgraded to light rail",
                sourceUrl: 'http://rescapes.net',
                credit: 'Rescape',
                date: 'December 2012'
            }),
            'Bus Rapid Transit': Map({
                caption: "BRT in Cambridge, England that attempts to imitate the aesthetics of a modern tram. A tram track would be safer in this pedestrian environment",
                sourceImageUrl: 'http://www.buszone.co.uk/Streetcar%5E061005_02.jpg',
                sourceUrl: 'http://www.skyscrapercity.com/showthread.php?t=1155659&page=2',
                credit: 'Thefancydanhimself, user of SkyscraperCity.com',
            }),
            'O Bahn Busway': Map({
                caption: "A rare fixed-guideway bus in Adelaide, South Australia, which also functions off-track in the suburbs",
                sourceImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/Bus_track.jpg?download',
                sourceUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/Bus_track.jpg',
                credit: 'Beneaththelandslide at English Wikipedia'
            }),
            'Montreal Metro': Map({
                caption: "New cars for Montreal's Metro, which is among the few that runs on rubber tires, resulting in a quiet, smooth underground ride",
                sourceImageUrl: 'https://shawglobalnews.files.wordpress.com/2014/04/metro-car-unveil-6.jpg?quality=70&strip=all&w=672&h=448&crop=1',
                sourceUrl: 'http://globalnews.ca/news/1296093/new-metro-trains-unveiled/',
                credit: 'Tim Sargeant/Global News'
            }),
            'Mi Teleferico': Map({
                caption: "Gondolas like this on in La Paz, Bolivia are an excellent fixed-guideway option for hills, mountains, and bodies of water",
                sourceImageUrl: 'http://i2.cdn.turner.com/cnnnext/dam/assets/150107162851-cable-cars-la-paz-gondola-exlarge-169.jpg',
                sourceUrl: 'http://www.cnn.com/2015/02/09/travel/worlds-most-amazing-cable-cars/',
                credit: 'CNN'
            }),
            'Funicular': Map({
                caption: "Feniculars like this classic one in Budapest, Hungary are also a viable fixed-guideway option for hills and mountains",
                sourceImageUrl: 'http://www.budapest.com/w/assignables/galleries/51/funicular_02.jpg',
                sourceUrl: 'http://www.budapest.com/city_guide/sights/monuments_of_art/buda_castle_funicular.en.html',
                credit: 'Budapest.com'
            })
        })
    }),

    'Types of Right-of-Way': Map({
        status: Statuses.INITIALIZED,
        id: '510744fa-42ef-452d-87af-2096ae064d40',
        scenes: OrderedMap({ entries: Map({
            'Class A ROW': Map({
                anchorId: 'id.18woithqdgdg'
            }),
            'Class B ROW': Map({
                anchorId: 'id.h4oentdtic5m'
            }),
            'Class C ROW': Map({
                anchorId: 'id.d35p1mlt87up'
            }),
        })}),
        media: OrderedMap({
            'Cologne': Map({
                caption: 'Practically all heavy-rail trains, like this high-speed train in Cologne, Germany, enjoy Class A ROW',
                sourceUrl: 'http://rescapes.net',
                credit: 'Rescape',
                date: 'August 2014'
            }),
            'Swedish Rail': Map({
                caption: 'Active Class A tracks of the railway station in Skinnskatteberg, Sweden',
                sourceUrl: 'http://www.tribunetalk.com/wp-content/uploads/2014/12/Streetcar.jpg',
                credit: 'Rescape',
                date: 'July 2016'
            }),
            'Jack London Square AMTRAK': Map({
                caption: 'Even though this AMTRAK train in Oakland, California runs down the middle of the street, it has class A right-of-way with crossing gates at intersections',
                sourceImageUrl: 'http://www.redoveryellow.com/railroad/21761_jack_london_oakland.jpg',
                sourceUrl: 'http://www.redoveryellow.com/railroad/_page1.html',
                credit: 'Eric Haas, red over yellow dot com'
            }),
            'St Charles Streetcar': Map({
                caption: 'The iconic St Charles Streetcar of New Orleans travels part of its route on unimpeded Class B right-of-way. Other parts of the route are unfortunately in mixed traffic',
                sourceImageUrl: 'http://i0.wp.com/gonola.com/images/Saint-Charles-streetcar.jpg?w=510',
                sourceUrl: 'http://gonola.com/2012/12/11/make-a-day-of-riding-the-saint-charles-streetcar.html',
                credit: 'Hotels.com'
            }),
            'Portland Streetcar in Traffic': Map({
                caption: 'A streetcar investment in Portland, Oregon needlessly discomforts and inconveniences its users by putting the streetcar in mixed traffic (Class C ROW)',
                sourceImageUrl: 'http://image.oregonlive.com/home/olive-media/width960/img/oregonian/photo/2015/12/03/portland-streetcar-dcae5f69472d7f5e.jpg',
                sourceUrl: 'http://www.oregonlive.com/commuting/index.ssf/2015/12/portland_streetcar_to_try_limi.html',
                credit: 'Zach Schaner - Seattle Transit Blog',
                date: 'November 2015'
            }),
            'Madison BRT Profile': Map({
                caption: 'A planned BRT route in Madison, Wisconsin is already to be compromised by Class C right-of-way',
                sourceImageUrl: 'http://s3.amazonaws.com/stb-wp/wp-content/uploads/2015/11/10113329/Madison-BRT-Profile-01.png, http://bloximages.chicago2.vip.townnews.com/host.madison.com/content/tncms/assets/v3/editorial/7/c0/7c0fff53-3e68-5dd1-847f-4d7a8ea4953e/543306d6a2f32.image.jpg',
                sourceUrl: 'http://seattletransitblog.com/2015/11/11/madison-brt-creep/, http://host.madison.com/wsj/news/local/govt-and-politics/madison-poised-for-next-steps-to-bus-rapid-transit-system/article_2c526b02-0100-51fd-92e7-39bb330b943a.html',
                credit: 'Mike Chechvala - Wisconsin State Journal',
                date: 'December 2015'
            }),
            'St Charles Streetcar versus Car': Map({
                caption: 'A Saint Charles streetcar runs in Class B right-of-way besides a car. Downtown the streetcar must compete with the car in class C right-of-way',
                sourceImageUrl: 'http://s3.amazonaws.com/stb-wp/wp-content/uploads/2015/11/10113329/Madison-BRT-Profile-01.png',
                sourceUrl: '',
                credit: 'Unknown',
                date: 'December 2007'
            }),
        })
    }),

    'Frequency of Transit Stops': Map({
        status: Statuses.INITIALIZED,
        id: '9173b60e-b557-44bf-a736-2e352e4f7a86',
        scenes: OrderedMap({ entries: Map({
            'Current Conditions': Map({
                anchorId: 'id.mxfqg4xj55jc'
            }),
            'Removal of Minor Stops': Map({
                anchorId: 'id.17g6w82r9xg0'
            }),
            'Consolidation of Close Stops': Map({
                anchorId: 'id.jkjm80gwudui'
            }),
            'Tram Upgrade': Map({
                anchorId: 'id.alne56ljtjfy'
            }),
            'Consolidation Challenges': Map({
                anchorId: 'id.829nmr5f03nd'
            }),
        })}),
        media: OrderedMap({
            'AC Transit': Map({
                type: 'png',
                caption: 'This local bus in Oakland, California, is littered with some 50 stops and dozens of stop signs and traffic lights on a 9 mile (14.5 km) line, meaning a stop every .2 miles (.3 km)',
                sourceUrl: 'https://sfbaytransit.org/actransit/route/11/map',
                credit: 'SF Bay Transit',
                date: 'As of September 2016'
            }),
            'Rapid Bus': Map({
                caption: 'This Rapid Bus in the Oakland, Calfornia region, despite running in mix traffic and other discomforts, wisely stops only every .5 miles (.8 km) on average',
                sourceImageUrl: 'http://i47.tinypic.com/flfzix.jpg',
                sourceUrl: 'https://cptdb.ca/topic/294-ac-transit/?page=2',
                credit: 'CPTDB Wiki Editor',
                date: 'June, 2010'
            }),
            'Deutsche Bahn': Map({
                caption: 'This 500 mile (800 km) high speed train trip in Germany from Munich to Hamburg has a reasonable eight intermediate stops in 5 1/2 hours',
                sourceUrl: 'https://www.bahn.com/, http://www.gamesareasocial.com/loja/222610/2/conteudo-adicional-dlc/DB-BR-Class-411-%C2%B4ICE-T%C2%B4-EMU-Add-On-detalhes',
                credit: 'Deutsche Bahn (schdule), Games Area (photo)',
                date: 'As of September 2016'
            }),
            'Third Street Muni': Map({
                caption: "Phase 1 of San Francisco's Third Street (T) Light Rail Line has 20 stops in 5 miles (8 km), all south of downtown. 10 stops would make nicer rides for all with .5 mile spacing instead of .2 to .3 miles",
                sourceImageUrl: 'http://mission.wpengine.netdna-cdn.com/wp-content/uploads/2010/04/muni-620x393.jpg',
                sourceUrl: 'http://missionlocal.org/2010/04/the-risks-of-riding-munis-third-street-line/',
                credit: 'Mission Local (Route list from Wikipedia)',
                date: 'April 2010'
            }),
            'A Train': Map({
                caption: "New York City's MTA A Line expresses by the stations of local lines on center tracks, creating a satisfying travel speed for longer trips",
                sourceImageUrl: 'http://cdn.newsday.com/polopoly_fs/1.12168711.1471269222!/httpImage/image.jpg_gen/derivatives/landscape_1280/image.jpg',
                sourceUrl: 'http://www.amny.com/transit/a-train-facts-figures-and-history-of-the-eighth-avenue-fulton-and-rockaway-lines-1.12168565',
                credit: 'AM New York',
                date: 'August 2016'
            }),
        })
    }),

    'Seat Comfort Metro and Tram': Map({
        title: 'Space and Seat Comfort',
        status: Statuses.INITIALIZED,
        scenes: OrderedMap({ entries: Map({
            'Empty Rows': Map({
                anchorId: 'id.em6st57x7wbe'
            }),
            'Plush Seats': Map({
                anchorId: 'id.rcz0hdr6gctf'
            }),
            'Occasional Wooden Seats': Map({
                anchorId: 'id.nj75dz9x9en1'
            }),
            'Classic Wooden Seats': Map({
                anchorId: 'id.xhr56xmk5mgb'
            }),
            'Seat Height': Map({
                anchorId: 'id.v297r7jcxci4'
            }),
            'Armrests and Recliners': Map({
                anchorId: 'id.bbssm7d9ycql'
            })
        })}),
        media: OrderedMap({
            'Munich Ubahn': Map({
                caption: "Munich's metro cars combine unpadded fabric row seats with wooden inward-facing seats",
                sourceImageUrl: 'https://i.ytimg.com/vi/zOLp6u7Se3Q/maxresdefault.jpg',
                sourceUrl: 'https://www.youtube.com/watch?v=zOLp6u7Se3Q',
                credit: 'You Tube',
            }),
            'BART': Map({
                caption: "The San Francisco Bay Area's BART and Washington DC's Metro cars are among few metro systems that feature padded seats",
                sourceImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c2/Bart_C2_car_Interior.jpg',
                sourceUrl: 'https://en.wikipedia.org/wiki/Bay_Area_Rapid_Transit',
                credit: 'Wikipedia',
            }),
            'Edinburgh Tram': Map({
                caption: "Edinburgh's trams feature padded seats with high seatbacks. There is no reason to deny passengers such niceties",
                sourceImageUrl: 'http://upload.wikimedia.org/wikipedia/commons/2/2b/Interior_of_Edinburgh_Tram_-_geograph.org.uk_-_1175899.jpg',
                sourceUrl: 'http://www.skyscrapercity.com/showthread.php?t=672554&page=153',
                credit: 'OneMelbGuy, user of SkyscraperCity.com',
            }),
            'Montpelier Tram': Map({
                caption: "Long trams like these in Montpelier, France increase the chance of plenty of open seats, which is always a good thing",
                sourceImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Montpellier_-_Tram_3_-_Details_%287716485224%29.jpg/1600px-Montpellier_-_Tram_3_-_Details_%287716485224%29.jpg',
                sourceUrl: 'https://commons.wikimedia.org/wiki/File:Montpellier_-_Tram_3_-_Details_(7716485224).jpg',
                credit: 'Wikimedia Commons',
            }),
            'St Charles Wooden Seats': Map({
                caption: 'The wooden benches on the New Orleans Saint Charles streetcar are reversible to match the direction of travel',
                sourceImageUrl: 'https://i.ytimg.com/vi/zOLp6u7Se3Q/maxresdefault.jpg',
                sourceUrl: 'https://www.youtube.com/watch?v=zOLp6u7Se3Q',
                credit: 'Go NOLA',
                date: 'May 2013'
            }),
        })
    }),

    'Seat Comfort AMTRAK and Bus': Map({
        title: 'Space and Seat Comfort',
        status: Statuses.INITIALIZED,
        id: '843cbe82-5a4a-4453-9766-488049133e9d',
        scenes: OrderedMap({ entries: Map({
            'Forward-facing Seats on AMTRAK': Map({
                anchorId: 'id.53cvna734bl4'
            }),
            "AMTRAK's Sightseeing Seats": Map({
                anchorId: 'id.nups2saj5zpa'
            }),
            'Low-floor buses have rear-facing seats': Map({
                anchorId: 'id.s9a7cdqojj39'
            }),
        })}),
        media: OrderedMap({
            'Brightline Interior': Map({
                caption: 'Brightline, a company building now rail service in Florida (All Aboard Florida) has designed train cars with "intuitive interiors"',
                sourceImageUrl: 'http://m.allaboardflorida.com/images/bl/Press-Release-Images/brightline_interiors_press-release.jpg?sfvrsn=4',
                sourceUrl: 'http://m.allaboardflorida.com/press/press-releases/2016/06/10/brightline-reveals-innovative-trains-under-construction',
                credit: 'Brightline',
            }),
            'Switzerland Bus Comfort': Map({
                caption: "This Swiss bus in the Alps in the nicest bus I have ever been in, the only local bus I've experienced that focuses on comfort and shows off the scenery",
                sourceUrl: 'http://rescapes.net',
                credit: 'Rescape',
                date: 'July 2016'
            })
        })
    }),

    'Personal Space and Privacy': Map({
        status: Statuses.INITIALIZED,
        id: '268c95fd-8a33-4636-bf72-ceaff2c1e997',
        scenes: OrderedMap({ entries: Map({
            'Train Compartment': Map({
                anchorId: 'id.n0mwt01mtot1'
            }),
            'AMTRAK Roomettes': Map({
                anchorId: 'id.ciyi25f3rtt'
            }),
            'AMTRAK Bedrooms': Map({
                anchorId: 'id.6hku2y24we4a'
            }),
            'Private Metro Compartments': Map({
                anchorId: 'id.cf2ldt4sfy35'
            }),
        })})
    }),

    'Access to Amenities': Map({
        status: Statuses.INITIALIZED,
        id: '6d32b9a2-8ef9-4b3f-8065-00d08ee87c05',
        scenes: OrderedMap({ entries: Map({
            'AMTRAK Toilet': Map({
                anchorId: 'id.c784pbnlt1sa'
            }),
            'Metro Toilet': Map({
                anchorId: 'id.wkg1zdsmjr7b'
            }),
            'Tram Toilet': Map({
                anchorId: 'id.tffs1gaxh5t5'
            }),
            'Metro Café': Map({
                anchorId: 'id.dfk0f1h01dbd'
            }),
            'Tram Café': Map({
                anchorId: 'id.5pgtgqe6khzj'
            })
        })})
    }),

    'Metro Station with Faregates': Map({
        status: Statuses.INITIALIZED,
        id: '605a8f98-af02-4b26-8145-cfe247f91dba',
        scenes: OrderedMap({entries: Map({
            'Metro Entrance with Faregates': Map({
                anchorId: 'id.97xvu0r03y0e'
            }),
            'Barriers Waste Time and Space': Map({
                anchorId: 'id.4ow1z2rta9gh'
            }),
            'Amenities Must Be Inside or Outside Faregates': Map({
                anchorId: 'id.v9iem34tpzwl'
            }),
            'Accessing Transit is Cumbersome': Map({
                anchorId: 'id.p4m8oqotbbz'
            }),
        })})
    }),

    'Metro Station with Faregates Removed': Map({
        status: Statuses.INITIALIZED,
        id: '1ed98a7a-99ec-4bb7-9fb1-41df8361c2ce',
        scenes: OrderedMap({entries: Map({
            'Validators Replace Faregates and Barriers': Map({
                anchorId: 'id.hk1vjyv7ea7a'
            }),
            'Quicker Access to Amenities': Map({
                anchorId: 'id.z94jy3r4mx0n'
            }),
            'Improved Movement Througout Station': Map({
                anchorId: 'id.62vj9iexviam'
            }),
            'Fast Fare Inspection': Map({
                anchorId: 'id.exqvsmpb53ea'
            }),
            'Luggage & Bike Conveyor': Map({
                anchorId: 'id.bnqw4memdz2g'
            }),
        })})
    }),

    'Personal Transportation and Freight (AMTRAK)': Map({
        status: Statuses.INITIALIZED,
        id: '659a315f-97b4-4a9c-8a29-4ca5f6e8cbac',
        scenes: OrderedMap({entries: Map({
            'Initial': Map({
                anchorId: 'id.phqdf6isq3v4'
            }),
            'Personal Bike Storage on Regional Trains': Map({
                anchorId: 'id.9itw958nhuqz'
            }),
        })})
    }),

    'Personal Transportation and Freight (Metro)': Map({
        status: Statuses.INITIALIZED,
        id: '04163027-d8a3-4912-9997-0f30573fd0fc',
        scenes: OrderedMap({entries: Map({
            'A hundred bikes fit on a long metro': Map({
                anchorId: 'id.3o0isfthvzsv'
            }),
        })})
    }),

    'Personal Transportation and Freight (Tram)': Map({
        status: Statuses.INITIALIZED,
        id: 'f04baa96-4c29-43ab-9f51-c8520c907d25',
        scenes: OrderedMap({entries: Map({
            'Long trams have plentiful bike storage': Map({
                anchorId: 'id.ksrni4wfi211'
            }),
            'Trams have flush, level boarding': Map({
                anchorId: 'id.xluw7fz8woop'
            }),
        })})
    }),

    'Personal Transportation and Freight (Bus)': Map({
        status: Statuses.INITIALIZED,
        id: 'eaaae7b6-5a68-4f3e-a9f0-21ba35ec73b7',
        scenes: OrderedMap({entries: Map({
            'External bike storage is limited and risky': Map({
                anchorId: 'id.b7ievcnhbpl7'
            }),
            'Wheelchairs on buses': Map({
                anchorId: 'id.xluw7fz8woop'
            }),
        })})
    }),

    'Station and Stop Amenities (Inside)': Map({
        status: Statuses.INITIALIZED,
        id: '731899d7-02b7-4f47-9a3b-7ae84454e0c7',
        scenes: OrderedMap({entries: Map({
            'New Station Amenities': Map({
                anchorId: 'id.hcrfkm926ytq',
            }),
        })}),
        media: OrderedMap({
            'Denver Union Station': Map({
                caption: 'Eastern AMTRAK Café Car tables with bike space',
                sourceImageUrl: 'http://www.bikenyc.org/sites/default/files/Bikes%20On%20Board%20Between%20ALB%20%26%20SDY.JPG',
                sourceUrl: 'http://www.bikenyc.org/blog/bikes-amtrak-trains-northeast-nyc-summer',
                credit: 'Bike NYC'
            }),
            'Bakery in Munich Hauptbahnhof': Map({
                caption: 'Fresh bakeries are common in train stations throughout Europe, but especially in Bavaria',
                credit: 'Andy Likuski',
                date: 'August 2014'
            }),
        })
    }),

    'Station and Stop Amenities (Outside, Poor)': Map({
        status: Statuses.INITIALIZED,
        id: '87320bcf-05d7-4df9-8e51-f5c1e8ed82d1',
        scenes: OrderedMap({entries: Map({
            'Amenity-Poor Transit Center': Map({
                anchorId: 'id.360zh96s35x0'
            }),
        })})
    }),

    'Station and Stop Amenities (Outside, Improved)': Map({
        status: Statuses.INITIALIZED,
        id: 'e2157bf5-de7d-413f-b80d-ec9ffc095a13',
        scenes: OrderedMap({entries: Map({
            'Improved Transit Center': Map({
                anchorId: 'id.f60tsmh8mcrv'
            }),
            'Transit Center Amenities': Map({
                anchorId: 'id.wmbnbioo95zf'
            }),
        })})
    }),
});

/***
 * The initial state of the application
 * @type {*|Map<K, V>|Map<string, V>}
 */
export default Map({
    // See settings.js action. All action keys can be set here
    settings: Map({
        [settingsActions.SET_3D]: false,
        [settingsActions.SET_RELATED_IMAGES]: true,
        [settingsActions.SET_LIGHTBOX_VISIBILITY]: false,
        // Threshold for switching between 3d models in the showcase
        MODEL_THRESHOLD: .25,
        // Padding between models when switching
        MODEL_PADDING: .1,
    }),
    documents: Map({
        keys: List(['ths_amtrak_standard', 'the_new_rules_of_the_road']),
        // The URL of the source document
        baseUrl: id => (`https://docs.google.com/document/d/${id}/pub`),
        // The URL of the site
        siteUrl: key => (`http://rescapes.net/${key}`),
        entries: Map({
            'the_amtrak_standard': Map({
                date: new Date('October 2016'),
                author: 'Andy Likuski',
                status: Statuses.INITIALIZED,
                title: 'The AMTRAK Standard',
                id: '1GbrsFkL4hlMP9o-J1JLw4Qu08j6hEPde_ElJdanJX5U',
                modelKeys: List(amtrakStandardModels.keys())
            }),
            'the_new_rules_of_the_road': Map({
                date: new Date('January 2017'),
                author: 'Andy Likuski',
                status: Statuses.INITIALIZED,
                title: 'The New Rules of the Road',
            })
        })
    }),
    models: Map({
        keys: List(amtrakStandardModels.keys()),
        /**
         * These parameters distinguish and size the 3d model. etp is used to get a 2d version
         * @param id: The unique id of the Sketchup model
         * @param etp: 'im' for still images. Blank for 3d
         */
        baseUrl: (id, etp) => (`https://my.sketchup.com/viewer/3dw?WarehouseModelId=${id}`),
        baseVideoUrl: modelKey => `/videos/${modelKey}.mp4`,

        entries: amtrakStandardModels
    })
})
