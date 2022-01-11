import { ImageData } from "./types";

export const nasaKey = process.env.NEXT_PUBLIC_NASA_KEY;

export function mapFailedResponseToDate(
  storedArr: string[],
  failureArr: PromiseSettledResult<ImageData>[]
): string[] {
  if (storedArr.length !== failureArr.length) return [];
  const result = [];

  for (let i = 0; i < storedArr.length; i++) {
    if (failureArr[i].status === "rejected") {
      result.push(storedArr[i]);
    }
  }

  return result;
}

export function mockTenCountCall(shouldError?: boolean) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldError) return reject("500 or 400 error or something");

      resolve(fakeTenCount);
    }, 1000);
  });
}

export const fakeTenCount = [
  {
    date: "2017-04-21",
    explanation:
      "Seen edge-on, spiral galaxy NGC 4302 (left) lies about 55 million light-years away in the well-groomed constellation Coma Berenices. A member of the large Virgo Galaxy Cluster, it spans some 87,000 light-years, a little smaller than our own Milky Way. Like the Milky Way, NGC 4302's prominent dust lanes cut along the center of the galactic plane, obscuring and reddening the starlight from our perspective. Smaller companion galaxy NGC 4298 is also a dusty spiral. But tilted more nearly face-on to our view,  NGC 4298 can show off dust lanes along spiral arms traced by the bluish light of young stars, as well as its bright yellowish core. In celebration of the 27th anniversary of the launch of the Hubble Space Telescope on April 24, 1990, astronomers used the legendary telescope to take this gorgeous visible light portrait of the contrasting galaxy pair.   Tonight Watch: The Lyrid Meteor Shower",
    hdurl: "https://apod.nasa.gov/apod/image/1704/STSCI_NGC4302_4298.jpg",
    media_type: "image",
    service_version: "v1",
    title: "NGC 4302 and NGC 4298",
    url: "https://apod.nasa.gov/apod/image/1704/STSCI_NGC4302_4298px1024.jpg",
  },
  {
    date: "1999-01-02",
    explanation:
      "Mercury's surface looks similar to our Moon's. Each is heavily cratered and made of rock.  Mercury's diameter is about 4800 km, while the Moon's is slightly less at about 3500 km (compared with about 12,700 km for the Earth). But Mercury is unique in many ways.  Mercury is the closest planet to the Sun, orbiting at about 1/3 the radius of the Earth's orbit. As Mercury slowly rotates, its surface temperature varies from an unbearably cold -180 degrees Celsius to an unbearably hot 400 degrees Celsius. The place nearest the Sun in Mercury's orbit changes slightly each orbit - a fact used by Albert Einstein to help verify the correctness of his then newly discovered theory of gravity: General Relativity.  The above picture was taken by the only spacecraft ever to pass Mercury: Mariner 10 in 1974.",
    hdurl: "https://apod.nasa.gov/apod/image/9901/merc2_m10_big.gif",
    media_type: "image",
    service_version: "v1",
    title: "Mercury: A Cratered Inferno",
    url: "https://apod.nasa.gov/apod/image/9901/merc2_m10.jpg",
  },
  {
    date: "2001-09-23",
    explanation:
      "Where did all the stars go?  What used to be considered a hole in the sky is now known to astronomers as a dark molecular cloud.  Here, a high concentration of dust and molecular gas absorb practically all the visible light emitted from background stars.  The eerily dark surroundings help make the interiors of molecular clouds some of the coldest and most isolated places in the universe.  One of the most notable of these dark absorption nebulae is a cloud toward the constellation Ophiuchus known as Barnard 68, pictured above.  That no stars are visible in the center indicates that Barnard 68 is relatively nearby, with measurements placing it about 500 light-years away and half a light-year across.  It is not known exactly how molecular clouds like Barnard 68 form, but it is known that these clouds are themselves likely places for new stars to form.",
    hdurl: "https://apod.nasa.gov/apod/image/0109/barnard68_vlt_big.jpg",
    media_type: "image",
    service_version: "v1",
    title: "Molecular Cloud Barnard 68",
    url: "https://apod.nasa.gov/apod/image/0109/barnard68_vlt.jpg",
  },
  {
    copyright: "Gordon Garradd",
    date: "1998-10-06",
    explanation:
      "The brightest comet in the sky right now is Comet Williams. Moving slowly though the constellation of Centaurus, Comet Williams, at magnitude 8, is visible to Southern Hemisphere observers with binoculars. In ten days, Comet Williams will reach its closest point to the Sun, although it will still be farther from the Sun than the Earth.  Comet Williams should become visible to many Northern Hemisphere observers in late November.  At magnitude 10, however, it might require a small telescope to see.  Comet Williams was discovered in early August by Peter Williams. The above image was taken August 25th from Australia.",
    hdurl: "https://apod.nasa.gov/apod/image/9810/williams_gg_big.jpg",
    media_type: "image",
    service_version: "v1",
    title: "Comet Williams in 1998",
    url: "https://apod.nasa.gov/apod/image/9810/williams_gg.jpg",
  },
  {
    date: "1997-07-06",
    explanation:
      "A Day or \"Sol\" on Mars is only 40 minutes longer than an Earth day - and Pathfinder's first day on Mars, Sol 1 according to its local calendar, was an eventful one. Still, late in the martian afternoon of Sol 1, the camera on board the Mars Pathfinder spacecraft recorded this panorama of the ancient floodplain Ares Vallis. Two of the three landing petals lie in the foreground at the edges of this scene surrounded by deflated and partially gathered airbags. The martian soil near the spacecraft has been disturbed by the airbag retraction. The petal holding the undeployed robot rover Sojourner is at the left. One of Sojourner's planned routes to the surface will be down the ramp seen rolled up at the petal's edge. Mission teams have overcome some rover communications problems and are proceding carefully with plans to roll the Sojourner out onto the martian surface. NASA has announced that the Pathfinder station on Mars will be renamed in honor of astronomer Carl Sagan.",
    hdurl: "https://apod.nasa.gov/apod/image/9707/mars2_pathfinder_big.jpg",
    media_type: "image",
    service_version: "v1",
    title: "A Martian Day's End",
    url: "https://apod.nasa.gov/apod/image/9707/mars2_pathfinder.jpg",
  },
  {
    date: "2020-10-09",
    explanation:
      "An inspirational sight, these giant dish antennas of the Karl G. Jansky Very Large Array (VLA) rise above the New Mexico desert at moonset.  Mounted on piers but transportable on railroad tracks to change the VLA’s configuration, its 27 operating antennas are each house-sized (25 meters across) and can be organized into an array spanning the size of a city (35 kilometers). A prolific radio astronomy workhorse, the VLA has been used to discover water on planet Mercury, radio-bright coronae around stars, micro-quasars in our Galaxy, gravitationally-induced Einstein rings around distant galaxies, and radio counterparts to cosmologically distant gamma-ray bursts. Its vast size has allowed astronomers to study the details of radio galaxies, super-fast cosmic jets, and map the center of our own Milky Way. Now 40 years since its dedication the VLA has been used in more than 14,000 observing projects and contributed to more than 500 Ph.D. dissertations. On October 10, the National Radio Astronomy Observatory will host a day-long online celebration of the VLA at 40 featuring virtual tours and presentations on the history, operations, science, and future of the Very Large Array.",
    hdurl: "https://apod.nasa.gov/apod/image/2010/VLA_Moonset_NIK_0991.jpg",
    media_type: "image",
    service_version: "v1",
    title: "The Very Large Array at Moonset",
    url: "https://apod.nasa.gov/apod/image/2010/VLA_Moonset_NIK_0991_1024.jpg",
  },
  {
    date: "2007-06-27",
    explanation:
      "If seen in the right light, Saturn glows like a neon sign.  Although Saturn has comparatively little of the element neon, a composite image false-colored in three bands of infrared light highlights features of the giant ringed planet like a glowing sign.  At the most blue band of the infrared light featured, false-colored blue in the above image, Saturn itself appears dark but Saturn's thin rings brightly reflect light from our Sun.   Conversely, Saturn's B ring is so thick that little reflected light makes it through, creating a dark band between Saturn's A and C rings.  At the most red band of the infrared, false-colored red above, Saturn emits a surprisingly detailed thermal glow, indicating planet-wide bands, huge hurricane-like storms, and a strange hexagon-shaped cloud system around the North Pole.  In the middle infrared band, false-colored green, the sunlit side of Saturn's atmosphere reflects brightly.   The above image was obtained in late February by the robotic Cassini spacecraft orbiting about 1.6 million kilometers out from Saturn.",
    hdurl: "https://apod.nasa.gov/apod/image/0706/neonsaturn_cassini_big.jpg",
    media_type: "image",
    service_version: "v1",
    title: "Neon Saturn",
    url: "https://apod.nasa.gov/apod/image/0706/neonsaturn_cassini.jpg",
  },
  {
    date: "2021-08-07",
    explanation:
      "Get out your red-blue glasses and hover over the surface of Mars. Taken on July 24, the 3D color view is from the Mars Ingenuity Helicopter's 10th flight above the Red Planet. Two images from Ingenuity's color camera, both captured at an altitude of 12 meters (40 feet), but a few meters apart to provide a stereo perspective, were used to construct the color anaglyph. Ingenuity's stereo images were made at the request of the Mars Perseverance rover science team. The team is considering a visit to these raised ridges on the floor of Jezero Crater during Perseverance's first science campaign.",
    hdurl: "https://apod.nasa.gov/apod/image/2108/PIA24688_RTE_Anaglyph.jpg",
    media_type: "image",
    service_version: "v1",
    title: "Jezero Crater: Raised Ridges in 3D",
    url: "https://apod.nasa.gov/apod/image/2108/PIA24688_RTE_Anaglyph1024.jpg",
  },
  {
    copyright: "Yuri BeletskyESO",
    date: "2008-05-07",
    explanation:
      "Is the night sky darkest in the direction opposite the Sun? No. In fact, a rarely discernable faint glow known as the gegenschein (German for \"counter glow\") can be seen 180 degrees around from the Sun in an extremely dark sky. The gegenschein is sunlight back-scattered off small interplanetary dust particles.  These dust particles are millimeter sized splinters from asteroids and orbit in the ecliptic plane of the planets.  Pictured above from last October is one of the most spectacular pictures of the gegenschein yet taken. Here a deep exposure of an extremely dark sky over Paranal Observatory in Chile shows the gegenschein so clearly that even a surrounding glow is visible.   In the foreground are several of the European Southern Observatory's Very Large Telescopes, while notable background objects include the Andromeda galaxy toward the lower left and the Pleiades star cluster just above the horizon.  The gegenschein is distinguished from zodiacal light near the Sun by the high angle of reflection.  During the day, a phenomenon similar to the gegenschein called the glory can be seen in reflecting air or clouds opposite the Sun from an airplane.    digg_url = 'http://apod.nasa.gov/apod/ap080507.html'; digg_skin = 'compact';",
    hdurl: "https://apod.nasa.gov/apod/image/0805/gegenschein_eso_big.jpg",
    media_type: "image",
    service_version: "v1",
    title: "The Gegenschein Over Chile",
    url: "https://apod.nasa.gov/apod/image/0805/gegenschein_eso.jpg",
  },
  {
    date: "2012-05-27",
    explanation:
      "Can you spot the planet? The diminutive disk of Mercury, the solar system's innermost planet, spent about five hours crossing in front of the enormous solar disk in 2003, as viewed from the general vicinity of planet Earth. The Sun was above the horizon during the entire transit for observers in Europe, Africa, Asia, or Australia, and the horizon was certainly no problem for the sun-staring SOHO spacecraft. Seen as a dark spot, Mercury progresses from left to right (top panel to bottom) in these four images from SOHO's extreme ultraviolet camera. The panels' false-colors correspond to different wavelengths in the extreme ultraviolet which highlight regions above the Sun's visible surface. This was the first of 14 transits of Mercury which will occur during the 21st century. Next week, however, an event much more rare but easier to spot will occur -- a transit of Venus across the Sun. Need help spotting Mercury? Just click on the picture.   New Image Feeds: APOD River on Google Plus and APOD Sky on Facebook",
    hdurl:
      "https://apod.nasa.gov/apod/image/1205/merctrans_sohoeit_annotated_960.jpg",
    media_type: "image",
    service_version: "v1",
    title: "Mercury Spotting",
    url: "https://apod.nasa.gov/apod/image/1205/merctrans_sohoeit_960.jpg",
  },
];
