import bpy
from datetime import datetime
import os
import json
import threading
import subprocess
import signal

def run_server():
    subprocess.run('npm run start', shell=True)
    
th = threading.Thread()
th.daemon = True
th.run = run_server

def export_gltf(apply_modifiers, path):
    bpy.ops.object.select_all(action='SELECT')
    scene = bpy.context.scene

    folder_path = os.path.join(bpy.path.abspath(path), 'viewer/public')
    if not os.path.exists(path):
        os.makedirs(path)
    path = os.path.join(folder_path, 'scene.glb')

    bpy.ops.export_scene.gltf(filepath=path, export_format='GLB', use_selection=True, export_apply=apply_modifiers, export_lights=True, export_cameras=True)

    split_path = os.path.normpath(path).split(os.sep)
    
    glb_path = 'scene.glb'
    os.chdir(folder_path)
    
    os.chdir('../')
    glb_path = os.path.join('public', glb_path)

    os.chdir('./src')
    glb_path = os.path.join('../', glb_path)

    subprocess.run('node ../../gltfjsx/cli.js ' + glb_path + ' --shadows --keepnames --instance', shell=True)


bl_info = {
    "name": "BlenderWebViewer",
    "description": "Web Viewer for Blender",
    "author": "elia",
    "version": (0, 1, 0),
    "blender": (2, 80, 0),
    "location": "3D View > Tools",
    "warning": "",
    "wiki_url": "",
    "tracker_url": "",
    "category": "Development"
}
import bpy
from bpy.props import (StringProperty,
                       BoolProperty,
                       IntProperty,
                       FloatProperty,
                       FloatVectorProperty,
                       EnumProperty,
                       PointerProperty,
                       CollectionProperty,
                       )
from bpy.types import (Panel,
                       Menu,
                       Operator,
                       PropertyGroup,
                       )


# ------------------------------------------------------------------------
#    Scene Properties
# ------------------------------------------------------------------------

class MyProperties(PropertyGroup):
    
    global current_group

    apply_transform: BoolProperty(
        name="Apply Transform",
        description="",
        default = True
        )
    apply_modifiers: BoolProperty(
        name="Apply Modifiers",
        description="",
        default = True
        )
    path: StringProperty(
        name="",
        description="",
        default = "//",
        subtype = 'DIR_PATH'
        )
# ------------------------------------------------------------------------
#    Operators
# ------------------------------------------------------------------------

class WM_OT_ExportScene(Operator):
    bl_label = "EXPORT"
    bl_idname = "wm.hello_world"

    def execute(self, context):
        scene = context.scene
        mytool = scene.my_tool
        self.report({'INFO'}, "EXPORTED SCENE")
        
        apply_modifiers = mytool.apply_modifiers
        path = mytool.path
        
        export_gltf(apply_modifiers, path)

        return {'FINISHED'}
    

# ------------------------------------------------------------------------
#    Menus
# ------------------------------------------------------------------------

class OBJECT_MT_CustomMenu(bpy.types.Menu):
    bl_label = "Select"
    bl_idname = "OBJECT_MT_custom_menu"

    def draw(self, context):
        layout = self.layout

        # Built-in operators
        layout.operator("object.select_all", text="Select/Deselect All").action = 'TOGGLE'
        layout.operator("object.select_all", text="Inverse").action = 'INVERT'
        layout.operator("object.select_random", text="Random")

# ------------------------------------------------------------------------
#    Panels
# ------------------------------------------------------------------------


class HelloWorldPanel:
    bl_space_type = "VIEW_3D"
    bl_label = "BlenderWeb"
    bl_category = "BlenderWeb"
    bl_context = "objectmode"  
    bl_region_type = "UI"

class OBJECT_PT_CustomPanel(HelloWorldPanel, Panel):
    bl_idname = "OBJECT_PT_custom_panel"
    bl_label = "Main"

    def draw(self, context):
        layout = self.layout
        scene = context.scene
        mytool = scene.my_tool
        global th

        layout.label(text="Path:")
        layout.prop(mytool, "path")
        layout.separator()
        layout.prop(mytool, "apply_modifiers")
        layout.separator()
        layout.operator("wm.hello_world")
# ------------------------------------------------------------------------
#    Registration
# ------------------------------------------------------------------------

classes = (
    MyProperties,
    WM_OT_ExportScene,
    OBJECT_MT_CustomMenu,
    OBJECT_PT_CustomPanel,
)
def register():
    from bpy.utils import register_class
    for cls in classes:
        register_class(cls)

    bpy.types.Scene.my_tool = PointerProperty(type=MyProperties)

def unregister():
    from bpy.utils import unregister_class
    for cls in reversed(classes):
        unregister_class(cls)
    del bpy.types.Scene.my_tool

if __name__ == "__main__":
    register()