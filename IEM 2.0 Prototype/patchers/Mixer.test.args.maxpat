{
	"patcher" : 	{
		"fileversion" : 1,
		"appversion" : 		{
			"major" : 7,
			"minor" : 3,
			"revision" : 4,
			"architecture" : "x86",
			"modernui" : 1
		}
,
		"rect" : [ 690.0, 152.0, 612.0, 596.0 ],
		"bglocked" : 0,
		"openinpresentation" : 0,
		"default_fontsize" : 12.0,
		"default_fontface" : 0,
		"default_fontname" : "Arial",
		"gridonopen" : 1,
		"gridsize" : [ 15.0, 15.0 ],
		"gridsnaponopen" : 1,
		"objectsnaponopen" : 1,
		"statusbarvisible" : 2,
		"toolbarvisible" : 1,
		"lefttoolbarpinned" : 0,
		"toptoolbarpinned" : 0,
		"righttoolbarpinned" : 0,
		"bottomtoolbarpinned" : 0,
		"toolbars_unpinned_last_save" : 0,
		"tallnewobj" : 0,
		"boxanimatetime" : 200,
		"enablehscroll" : 1,
		"enablevscroll" : 1,
		"devicewidth" : 0.0,
		"description" : "",
		"digest" : "",
		"tags" : "",
		"style" : "",
		"subpatcher_template" : "",
		"boxes" : [ 			{
				"box" : 				{
					"id" : "obj-100",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"patching_rect" : [ 64.0, 426.0, 69.0, 22.0 ],
					"save" : [ "#N", "thispatcher", ";", "#Q", "end", ";" ],
					"style" : "",
					"text" : "thispatcher"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-81",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 34.0, 382.0, 87.0, 22.0 ],
					"style" : "",
					"text" : "explore foobar"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-4",
					"maxclass" : "button",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "bang" ],
					"patching_rect" : [ 157.0, 361.0, 24.0, 24.0 ],
					"style" : ""
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-2",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 165.0, 419.0, 107.0, 22.0 ],
					"saved_object_attributes" : 					{
						"filename" : "testNewMixer.js",
						"parameter_enable" : 0
					}
,
					"style" : "",
					"text" : "js testNewMixer.js"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-1",
					"maxclass" : "newobj",
					"numinlets" : 0,
					"numoutlets" : 0,
					"patching_rect" : [ 51.5, 457.0, 215.0, 22.0 ],
					"style" : "",
					"text" : "mixer2.0.iem foobar inputs 8 outputs 4",
					"varname" : "mixer2.0.iem"
				}

			}
, 			{
				"box" : 				{
					"args" : [ "foobar", "input", 4 ],
					"bgmode" : 0,
					"border" : 0,
					"clickthrough" : 0,
					"enablehscroll" : 0,
					"enablevscroll" : 0,
					"id" : "obj-77",
					"lockeddragscroll" : 0,
					"maxclass" : "bpatcher",
					"numinlets" : 0,
					"numoutlets" : 0,
					"offset" : [ 0.0, 4.0 ],
					"patching_rect" : [ 0.0, 0.0, 0.0, 0.0 ],
					"viewvisibility" : 1
				}

			}
, 			{
				"box" : 				{
					"args" : [ "mixer", "inputs", 4, "outputs", 2 ],
					"bgmode" : 0,
					"border" : 0,
					"clickthrough" : 0,
					"enablehscroll" : 0,
					"enablevscroll" : 0,
					"id" : "obj-5",
					"lockeddragscroll" : 0,
					"maxclass" : "bpatcher",
					"name" : "mixer2.0.iem.maxpat",
					"numinlets" : 0,
					"numoutlets" : 0,
					"offset" : [ 0.0, 0.0 ],
					"patching_rect" : [ 0.0, 0.0, 950.0, 290.0 ],
					"varname" : "mixer",
					"viewvisibility" : 1
				}

			}
 ],
		"lines" : [ 			{
				"patchline" : 				{
					"destination" : [ "obj-2", 0 ],
					"source" : [ "obj-4", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-2", 0 ],
					"source" : [ "obj-81", 0 ]
				}

			}
 ],
		"dependency_cache" : [ 			{
				"name" : "mixer2.0.iem.maxpat",
				"bootpath" : "~/Documents/Max 7/Projects/IEM_2.0/IEM 2.0 Prototype/patchers",
				"patcherrelativepath" : ".",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "mixer.inputs.iem.maxpat",
				"bootpath" : "~/Documents/Max 7/Projects/IEM_2.0/IEM 2.0 Prototype/patchers",
				"patcherrelativepath" : ".",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "mixer.channel.iem.maxpat",
				"bootpath" : "~/Documents/Max 7/Projects/IEM_2.0/IEM 2.0 Prototype/patchers",
				"patcherrelativepath" : ".",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "stereopanner.maxpat",
				"bootpath" : "~/Documents/Max 7/Projects/IEM_2.0/IEM 2.0 Prototype/patchers",
				"patcherrelativepath" : ".",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "solos.maxpat",
				"bootpath" : "/Volumes/DB Wetzel/Users/davidwetzel/Documents/MaxMSP/IEM/Modules/abstractions & scripts",
				"patcherrelativepath" : "../../../../../../../../Volumes/DB Wetzel/Users/davidwetzel/Documents/MaxMSP/IEM/Modules/abstractions & scripts",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "set-cc.maxpat",
				"bootpath" : "/Volumes/DB Wetzel/Users/davidwetzel/Documents/MaxMSP/IEM/Modules/abstractions & scripts",
				"patcherrelativepath" : "../../../../../../../../Volumes/DB Wetzel/Users/davidwetzel/Documents/MaxMSP/IEM/Modules/abstractions & scripts",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "ramp.maxpat",
				"bootpath" : "~/Documents/Max 7/Projects/IEM_2.0/IEM 2.0 Prototype/patchers",
				"patcherrelativepath" : ".",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "polyramp.maxpat",
				"bootpath" : "~/Documents/Max 7/Projects/IEM_2.0/IEM 2.0 Prototype/patchers",
				"patcherrelativepath" : ".",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "ramp.js",
				"bootpath" : "~/Documents/Max 7/Projects/IEM_2.0/IEM 2.0 Prototype/code",
				"patcherrelativepath" : "../code",
				"type" : "TEXT",
				"implicit" : 1
			}
, 			{
				"name" : "rampVoiceCounter.js",
				"bootpath" : "~/Documents/Max 7/Projects/IEM_2.0/IEM 2.0 Prototype/code",
				"patcherrelativepath" : "../code",
				"type" : "TEXT",
				"implicit" : 1
			}
, 			{
				"name" : "modParse.js",
				"bootpath" : "~/Documents/Max 7/Projects/IEM_2.0/IEM 2.0 Prototype/code",
				"patcherrelativepath" : "../code",
				"type" : "TEXT",
				"implicit" : 1
			}
, 			{
				"name" : "mixer.inputs.js",
				"bootpath" : "~/Documents/Max 7/Projects/IEM_2.0/IEM 2.0 Prototype/code",
				"patcherrelativepath" : "../code",
				"type" : "TEXT",
				"implicit" : 1
			}
, 			{
				"name" : "testFader.js",
				"bootpath" : "~/Documents/Max 7/Projects/IEM_2.0/IEM 2.0 Prototype/patchers",
				"patcherrelativepath" : ".",
				"type" : "TEXT",
				"implicit" : 1
			}
, 			{
				"name" : "testNewMixer.js",
				"bootpath" : "~/Documents/Max 7/Projects/IEM_2.0/IEM 2.0 Prototype/patchers",
				"patcherrelativepath" : ".",
				"type" : "TEXT",
				"implicit" : 1
			}
 ],
		"autosave" : 0
	}

}
