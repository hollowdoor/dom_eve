import events from '../';
let tracker = events.track();

events('#clickme', tracker).on('click', event=>{
    console.log('click!');
});

events('#remove').on('click', event=>{
    tracker.clear();
});
