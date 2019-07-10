const St = imports.gi.St
const Main = imports.ui.main
const Tweener = imports.ui.tweener
const GnomeDesktop = imports.gi.GnomeDesktop

let text, button, Clock

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
    let button = new St.Bin({ style_class: 'panel-button',
        reactive: true,
        x_fill: true,
        y_fill: false,
        track_hover: true })
    on_tick()
}

function enable() {
    Main.panel._centerBox.insert_child_at_index(button, 0)
    // ref  gnome-shell /gnome-shell-3.5.4/js/ui/dateMenu.js
    let Clock = new GnomeDesktop.WallClock()
    Clock.connect('notify::clock', on_tick)
}

function disable() {
    Main.panel._centerBox.remove_child(button)
}
