import events from '../';

events(document.body).on('click', event=>{
    console.log('click!');
});
