# BlenderWebViewer
a Web Viewer for Blender.

![gif](https://user-images.githubusercontent.com/32492427/164890848-e6bf831d-06f8-4cba-80df-8cd4e3b32492.gif)

**To get started**:
- Clone the repo
- Install the add-on for Blender (`blenderPlugin.zip`)
- change the path field in the blender add-on to your `viewer` folder (ie. Users/elia/Documents/BlenderWebViewer/viewer)
- click `run server` in the blender add-on (it's going to take a few seconds while it downloads all the dependencies)
- click `export` in the blender add-on
- visit the page `localhost:3000` to view your blender scene in your browser
#

When you move objects around the plugin is going to hot-reload the page but if you add new elements you might have to refresh the page manually.

It currently does not support Area lights.

#

to do list:

- find a way to export/import ambient lights / HDRIs
- add animations to the web viewer
- convert area lights from blender to three.js
