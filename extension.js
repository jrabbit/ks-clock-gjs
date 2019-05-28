
const St = imports.gi.St;
const Main = imports.ui.main;
const Tweener = imports.ui.tweener;
const GnomeDesktop = imports.gi.GnomeDesktop;

let text, button, Clock

function _hideHello() {
    Main.uiGroup.remove_actor(text);
    text = null;
}

function _showHello() {
    if (!text) {
        text = new St.Label({ style_class: 'helloworld-label', text: "Hello, world!" });
        Main.uiGroup.add_actor(text);
    }

    text.opacity = 255;

    let monitor = Main.layoutManager.primaryMonitor;

    text.set_position(monitor.x + Math.floor(monitor.width / 2 - text.width / 2),
                      monitor.y + Math.floor(monitor.height / 2 - text.height / 2));

    Tweener.addTween(text,
                     { opacity: 0,
                       time: 2,
                       transition: 'easeOutQuad',
                       onComplete: _hideHello });
}

function GetKilosecondsNow () {
	//cribbed https://wiki.archlinux.org/index.php/User:Haxit/Kiloseconds#Javascript
	ourDate = new Date()
	metricTime =  (ourDate.getHours() * 3600 + ourDate.getMinutes() * 60 + ourDate.getSeconds())
	return metricTime/1000
}

function on_tick() {
	let ks = GetKilosecondsNow()
	let displayText = new St.Label({text: "%s ks".format(ks)})
    button.set_child(displayText);
}

function init() {
    button = new St.Bin({ style_class: 'panel-button',
                          reactive: true,
                          x_fill: true,
                          y_fill: false,
                          track_hover: true });
    let ks = GetKilosecondsNow()
    let displayText = new St.Label({text: "%s ks".format(ks)})
    button.set_child(displayText);
    // button.connect('button-press-event', _showHello);
}

function enable() {
    Main.panel._centerBox.insert_child_at_index(button, 0);
    Clock = new GnomeDesktop.WallClock();
    Clock.connect('notify::clock', on_tick);
}

function disable() {
    Main.panel._centerBox.remove_child(button);
}
