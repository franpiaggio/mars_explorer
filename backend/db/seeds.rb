perseverance = Rover.find_or_create_by(name: "Perseverance",
                                    landing_date: Date.new(2021, 2, 18))
curiosity = Rover.find_or_create_by(name: "Curiosity",
                                    landing_date: Date.new(2012, 8, 6))

perseverance.cameras.find_or_create_by(name: "EDL_RUCAM", full_name: "Rover Up-Look Camera")
perseverance.cameras.find_or_create_by(name: "EDL_RDCAM", full_name: "Rover Down-Look Camera")
perseverance.cameras.find_or_create_by(name: "EDL_DDCAM", full_name: "Descent Stage Down-Look Camera")
perseverance.cameras.find_or_create_by(name: "EDL_PUCAM1", full_name: "Parachute Up-Look Camera A")
perseverance.cameras.find_or_create_by(name: "EDL_PUCAM2", full_name: "Parachute Up-Look Camera B")
perseverance.cameras.find_or_create_by(name: "NAVCAM_LEFT", full_name: "Navigation Camera - Left")
perseverance.cameras.find_or_create_by(name: "NAVCAM_RIGHT", full_name: "Navigation Camera - Right")
perseverance.cameras.find_or_create_by(name: "MCZ_RIGHT", full_name: "Mast Camera Zoom - Right")
perseverance.cameras.find_or_create_by(name: "MCZ_LEFT", full_name: "Mast Camera Zoom - Left")
perseverance.cameras.find_or_create_by(name: "FRONT_HAZCAM_LEFT_A", full_name: "Front Hazard Avoidance Camera - Left")
perseverance.cameras.find_or_create_by(name: "FRONT_HAZCAM_RIGHT_A", full_name: "Front Hazard Avoidance Camera - Right")
perseverance.cameras.find_or_create_by(name: "REAR_HAZCAM_LEFT", full_name: "Rear Hazard Avoidance Camera - Left")
perseverance.cameras.find_or_create_by(name: "REAR_HAZCAM_RIGHT", full_name: "Rear Hazard Avoidance Camera - Right")
perseverance.cameras.find_or_create_by(name: "SKYCAM", full_name: "MEDA Skycam")
perseverance.cameras.find_or_create_by(name: "SHERLOC_WATSON", full_name: "SHERLOC WATSON Camera")
perseverance.cameras.find_or_create_by(name: "SUPERCAM_RMI", full_name: "SuperCam Remote Micro Imager")
perseverance.cameras.find_or_create_by(name: "LCAM", full_name: "Lander Vision System Camera")
perseverance.cameras.find_or_create_by(name: "PIXL_MCC", full_name: "PIXL Micro Context Camera")

curiosity.cameras.find_or_create_by(name: "FHAZ", full_name: "Front Hazard Avoidance Camera")
curiosity.cameras.find_or_create_by(name: "RHAZ", full_name: "Read Hazard Avoidance Camera")
curiosity.cameras.find_or_create_by(name: "MAST", full_name: "Mast Camera")
curiosity.cameras.find_or_create_by(name: "CHEMCAM", full_name: "Chemistry and Camera Complex")
curiosity.cameras.find_or_create_by(name: "MAHLI", full_name: "Mars Hand Lens Imager")
curiosity.cameras.find_or_create_by(name: "MARDI", full_name: "Mars Descent Imager")
curiosity.cameras.find_or_create_by(name: "NAVCAM", full_name: "Navigation Camera")

PerseveranceScraper.new.scrape
CuriosityScraper.new.scrape
