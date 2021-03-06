var Narcissus = {
	"info": {
		"doctype": "IEM Event List",
		"IEMversion": "2.0",
		"author": "David B Wetzel",
		"date": "2017",
		"comments": "New realization in IEM 2.0 with JSON-based event list"
	},
	"meta": {
		"composer": "Thea Musgrave",
		"title": "Narcissus",
		"subtitle": "for flute or B-flat clarinet and digital delay",
		"year": "1987",
		"commission": "NEA Consortium Commissioning Grant",
		"note": "Originally realized using the Vesta Kaza DIG411. IEM realization based on 2004 DMA dissertation"
	},
	"setup": {
		"newmod": [{
			"file": "mixer.iem.maxpat",
			"name": "Nmix",
			"comments": "Handles both audio routing and spatialization tasks"
		}, {
			"file": "delay.iem.maxpat",
			"name": "Ndelay",
			"comments": "standardized delay processor"
		}, {
			"file": "VKDIG411.iem.maxpat",
			"name": "VK411",
			"comments": "VK DIG411 interface translator for standardized delay"
		}, {
			"file": "MIDIcontroller.iem.maxpat",
			"name": "Npedals",
			"comments": "MIDI foot pedal manager"
		}, {
			"file": "ramp.iem.maxpat",
			"name": "Nvol",
			"comments": "Automated volume control"
		}],
		"init": [{
			"comments": "set inputs, outputs, and levels",
			"name": "Nmix",
			"audio": {
				"in~": {
					"1": "ADC[0]",
					"2": "ADC[0]",
					"3": "Ndelay~"
				},
				"out~": {
					"1": "DAC[0]",
					"2": "DAC[1]"
				}
			},
			"parameters": {
				"trim": {
					"1": 0.8,
					"2": 0.8,
					"3": 1.0
				},
				"fader": {
					"1": 0.8,
					"2": 0.8
				},
				"pan": {
					"1": 0,
					"2": 127
				}
			}
		}, {
			"comments": "set input to Mic 1; set external controls",
			"name": "Ndelay",
			"audio": {
				"in~": "ADC[0]",
				"out~": "Ndelay~"
			},
			"control": {
				"in": {
					"comments": "receive from VK emulator",
					"time": "VKtime",
					"fb": "VKfb",
					"depth": "VKdepth",
					"LFOspeed": "VKspeed",
					"hold": "VKhold",
					"bypass": "VKbypass",
					"gain": "VKvol",
					"trim": "VKinput",
					"dry": "VKdry"
				},
				"out": {}
			},
			"parameters": {
				"trim": 127,
				"gain": 127,
				"dry": 127,
				"bypass": 1,
				"hold": 0,
				"time": 512,
				"speed": 0,
				"depth": 0
			}
		}, {
			"comments": "Set up DIG411 emulator",
			"name": "VK411",
			"control": {
				"in": {
					"comments": "control VK interface from MIDI pedals",
					"vol": "vPedal",
					"hold": "sustain",
					"bp": "modwheel"
				},
				"out": {
					"comments": "send control data to delay module",
					"vol": "VKvol",
					"dry": "VKdry",
					"hold": "VKhold",
					"time": "VKtime",
					"depth": "VKdepth",
					"speed": "VKspeed",
					"fb": "VKfb",
					"trim": "VKtrim",
					"bypass": "VKbp"
				}
			},
			"parameters": {
				"input": 10,
				"range": 512,
				"time": 0.5,
				"dry": 10,
				"volume": 9,
				"fb": 0,
				"speed": 0.1,
				"depth": 0,
				"bypass": 1
			}
		}, {
			"comments": "Npedals: assign & setup MIDI foot pedals",
			"name": "Npedals",
			"control": {
				"out": {
					"1": "step",
					"2": "sustain",
					"3": "sustain",
					"4": "autovol"
				}
			},
			"parameters": {
				"cc": {
					"1": 61,
					"2": 62,
					"3": 63,
					"4": 64,
					"5": 65
				},
				"chan": {
					"1": 1,
					"2": 1,
					"3": 1,
					"4": 1,
					"5": 1
				},
				"mode": {
					"1": 2,
					"2": 0,
					"3": 0,
					"4": 2
				},
				"polarity": {
					"4": 1
				}
			}
		}, {
			"name": "Nvol",
			"control": {
				"in": {
					"trigger": "autovol"
				},
				"out": {
					"target": "volpedal"
				}
			},
			"parameters": {
				"trigger": 127
			}
		}, {
			"comments": "set next-event pedal and set sequence",
			"name": "main",
			"control": {
				"in": {
					"event": "step"
				}
			},
			"parameters": {
				"set-event": 0,
				"sequence": "performance"
			}
		}]
	},
	"sequences": {
		"soundcheck": [{}, {}, {}],
		"performance": [
		{
			"comments": "Event 0 - pre-performance",
			"modules": [
			{
				"comments": "re-initialize the system",
				"name": "main",
				"parameters": {
					"setup": "init"
				}
			}
			]
		}, {
			"comments": "Event 1 - m. 1",
			"modules": [{
				"comments": "re-initialize the system",
				"name": "main",
				"parameters": {
					"setup": "init"
				}
			}]
		}, {
			"comments": "EVENT 2 - m. 63 \"Sees pool of water\" DEL=512x0.5 FB=0 BYPASS=OFF",
			"modules": [{
				"name": "main",
				"parameters": {
					"console": "m. 63 - \"Sees a pool of water\" - DEL=512x0.5 FB=0 BYPASS=OFF"
				}
			}, {
				"name": "VK411",
				"parameters": {
					"bypass": 0,
					"range": 512,
					"time": 0.5,
					"feedback": 0,
					"depth": 0
				}
			}, {
				"name": "Nvol",
				"parameters": {
					"line": "127 100",
					"trigger": 127
				}
			}]
		}, {
			"comments": "EVENT 3 - m. 76 - \"Jumps back in fright\" DEL=512x0.5 FB=0 BYPASS=ON",
			"modules": [
			{
				"name": "main",
				"parameters": {
					"console": "m. 76 - \"Jumps back in fright\" - bypass ON"
				}
			}, {
				"name": "VK411",
				"parameters": {
					"bypass": 1,
					"range": 512,
					"time": 0.5,
					"feedback": 0,
					"depth": 0
				}
			}, {
				"name": "Nvol",
				"parameters": {
					"line": "127 100"
				}
			}]
		}, {
			"comments": "EVENT 4 m. 77 FB=2 DEL=512x0.5 BYPASS=OFF",
			"modules": [{
				"name": "main",
				"parameters": {
					"console": "m. 77 - Meno mosso \"Is IT still there?\" - FB=2 DEL=512x0.5 BYPASS=OFF"
				}
			}, {
				"name": "VK411",
				"parameters": {
					"feedback": 2,
					"bypass": 0,
					"range": 512,
					"time": 0.5,
					"depth": 0
				}
			}, {
				"name": "Nvol",
				"parameters": {
					"line": "127 100",
					"setline": "127 0 10000"
				}
			}]
		}, {
			"comments": "EVENT 5 m. 88 VOL=0 FB=4 DEL=512x1",
			"modules": [{
				"name": "main",
				"parameters": {
					"console": "m. 88 - Poco agitato \"Narcissus steps back ...\" - VOL=0 FB=4 DEL=512x1 BYPASS=OFF"
				}
			}, {
				"name": "VK411",
				"parameters": {
					"feedback": 4,
					"range": 512,
					"time": 1.0,
					"bypass": 0,
					"depth": 0
				}
			}, {
				"name": "volramp",
				"parameters": {
					"line": "0 100",
					"setline": "0 127 3000 0 5000 127 3000 0 5000 127 3000 0 15000 127 2000 0 4000 127 2000 0 4000 127 4000"
				}
			}]
		}, {
			"comments": "EVENT 6 m. 171 Liricamente con rubato VOL=UP FB=6 DEL=512x1 BYPASS=OFF",
			"modules": [{
				"name": "main",
				"parameters": {
					"console": "m. 171 Liricamente con rubato \"In the shimmering sunlight ...\" - VOL UP FB=6 DEL=512x1 BYPASS=OFF"
				}
			}, {
				"name": "VK411",
				"parameters": {
					"feedback": 6,
					"range": 512,
					"time": 1.0,
					"bypass": 0,
					"depth": 0
				}
			}, {
				"name": "volramp",
				"parameters": {
					"line": "127 100",
					"setline": "127 0 12000 127 3000 0 4000 127 3000 0 4000 127 6000"
				}
			}]
		}, {
			"comments": "EVENT 7 m. 246 Giocosso. Doppio movimento VOL=UP FB=4 DEL=512x0.5 BYPASS=OFF",
			"modules": [{
				"name": "main",
				"parameters": {
					"console": "m. 246 Giocosso. Doppio movimento \"Narcissus then responds playfully - happily\" - VOL UP FB=4 DEL=512x0.5 BYPASS=OFF"
				}
			}, {
				"name": "VK411",
				"parameters": {
					"feedback": 4,
					"range": 512,
					"time": 0.5,
					"bypass": 0,
					"depth": 0
				}
			}, {
				"name": "volramp",
				"parameters": {
					"line": "127 100"
				}
			}]
		}, {
			"comments": "EVENT 8 m. 315 Andante VOL=UP FB=6 DEL=512x0.5 BYPASS=OFF",
			"modules": [{
				"name": "main",
				"parameters": {
					"console": "console m. 315 Andante \"Narcissus anxiously questions ...\" - VOL=UP FB=6 DEL=512x0.5 BYPASS=OFF"
				}
			}, {
				"name": "VK411",
				"parameters": {
					"feedback": 6,
					"range": 512,
					"time": 0.5,
					"bypass": 0,
					"depth": 0
				}
			}, {
				"name": "volramp",
				"parameters": {
					"line": "127 100"
				}
			}]
		}, {
			"comments": "EVENT 9 m. 369 VOL=UP FB=6 DEL=512x0.5 MOD=1 BYPASS=OFF",
			"modules": [{
				"name": "main",
				"parameters": {
					"console": "cm. 369 \"The waves surge up ... Narcissus drowns\" - VOL=UP FB=6 DEL=512x0.5 MOD=1 BYPASS=OFF"
				}
			}, {
				"name": "VK411",
				"parameters": {
					"feedback": 6,
					"range": 512,
					"time": 0.5,
					"bypass": 0,
					"depth": 1.5
				}
			}, {
				"name": "volramp",
				"parameters": {
					"line": "127 100"
				}
			}]
		}, {
			"comments": "EVENT 10 m. 383 VOL=UP FB=6 DEL=512x0.5 MOD=2 BYPASS=OFF",
			"modules": [{
				"name": "main",
				"parameters": {
					"console": "m. 383 \"All that remainsis a distant shimmering vision ...\" - VOL=UP FB=6 DEL=512x0.5 MOD=2 BYPASS=OFF"
				}
			}, {
				"name": "VK411",
				"parameters": {
					"feedback": 6,
					"range": 512,
					"time": 0.5,
					"bypass": 0,
					"depth": 2.5
				}
			}, {
				"name": "volramp",
				"parameters": {
					"line": "127 100"
				}
			}]
		}, {
			"comments": "EVENT 11 m. 396 VOL=UP FB=6 DEL=512x2 MOD=2 BYPASS=OFF",
			"modules": [{
				"name": "main",
				"parameters": {
					"console": "m. 396 - VOL=UP FB=6 DEL=512x2 MOD=2 BYPASS=OFF"
				}
			}, {
				"name": "VK411",
				"parameters": {
					"feedback": 6,
					"range": 512,
					"time": 2,
					"bypass": 0,
					"depth": 2.5
				}
			}, {
				"name": "volramp",
				"parameters": {
					"line": "127 100",
					"setline": "127 80 6000 100 3000"
				}
			}]
		}, {
			"comments": "EVENT 12 m. 422",
			"modules": [{
				"name": "main",
				"parameters": {
					"console": "m. 422 - VOL UP FB=6 DEL=512x2 MOD=1 BYPASS=OFF"
				}
			}, {
				"name": "VK411",
				"parameters": {
					"feedback": 6,
					"range": 512,
					"time": 2,
					"bypass": 0,
					"depth": 1
				}
			}, {
				"name": "volramp",
				"parameters": {
					"line": "100 100"
				}
			}]
		}, {
			"comments": "EVENT 13 m. 424 VOL=UP FB=6 DEL=512x2 MOD=0 BYPASS=OFF",
			"modules": [{
				"name": "main",
				"parameters": {
					"console": "m. 424 - \"The vision disappears ...\" VOL=UP FB=6 DEL=512x2 MOD=0 BYPASS=OFF"
				}
			}, {
				"name": "VK411",
				"parameters": {
					"feedback": 6,
					"range": 512,
					"time": 2,
					"bypass": 0,
					"depth": 0
				}
			}, {
				"name": "volramp",
				"parameters": {
					"line": "100 100",
					"setline": "100 0 8000"
				}
			}]
		}, {
			"comments": "EVENT 14 - FIN - back to ev. 1",
			"modules": [{
				"name": "main",
				"parameters": {
					"console": "FIN - \"next event restarts from beginning\"",
					"setEvent": 0
				}
			}, {
				"name": "VK411",
				"parameters": {
					"volume": 0
				}
			}]
		}]
	}
};