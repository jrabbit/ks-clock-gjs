'use strict'
const ExtensionUtils = imports.misc.extensionUtils
const Me = ExtensionUtils.getCurrentExtension()

const St = imports.gi.St
const Main = imports.ui.main
const GnomeDesktop = imports.gi.GnomeDesktop

let text, button, clock_signal, Clock

function GetKilosecondsNow() {
    //cribbed https://wiki.archlinux.org/index.php/User:Haxit/Kiloseconds#Javascript
    let ourDate = new Date()
    let metricTime =  (ourDate.getHours() * 3600 + ourDate.getMinutes() * 60 + ourDate.getSeconds())
    return metricTime/1000
}

function on_tick() {
    let ks = GetKilosecondsNow()
    let displayText = new St.Label({text: '%s ks'.format(ks)})
    button.set_child(displayText)
}

function init() {
    log(`initializing ${Me.metadata.name} version ${Me.metadata.version}`);
}

function enable() {
    log(`enabling ${Me.metadata.name} version ${Me.metadata.version}`);
    button = new St.Bin({ style_class: 'kiloseconds-panel-button panel-button',
        reactive: true,
        //x_fill: true,
        //y_fill: false,
        track_hover: true })
    on_tick()
    //[1;4QrMain.panel._centerBox.insert_child_at_index(button, 0)
    Main.panel._centerBox.add_child(button)
    // ref  gnome-shell /gnome-shell-3.5.4/js/ui/dateMenu.js
    Clock = new GnomeDesktop.WallClock()
    clock_signal = Clock.connect('notify::clock', on_tick)
}

function disable() {
    log(`disabling ${Me.metadata.name} version ${Me.metadata.version}`);
    Main.panel._centerBox.remove_child(button)
    Clock.disconnect(clock_signal)
}
