/// <reference path="../node_modules/@workadventure/iframe-api-typings/iframe_api.d.ts" />

import {bootstrapExtra} from "@workadventure/scripting-api-extra";

// The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure.
bootstrapExtra().catch(e => console.error(e));

let currentPopup: any = undefined;
const today = new Date();
const time = today.getHours() + ":" + today.getMinutes();

WA.room.onEnterZone('clock', () => {
    currentPopup =  WA.ui.openPopup("clockPopup","It's " + time,[]);
})
WA.room.onLeaveZone('clock', closePopUp)

WA.room.onEnterZone('djbooth', () => {
    currentPopup =  WA.ui.openPopup("djboothPopup","Now playing: Nine Inch Nails (from the album The Slip, CC BY-NC-SA)",[]);
})
WA.room.onLeaveZone('djbooth', closePopUp)

function closePopUp(){
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}