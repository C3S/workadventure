/// <reference path="../node_modules/@workadventure/iframe-api-typings/iframe_api.d.ts" />

import {bootstrapExtra} from "@workadventure/scripting-api-extra";

// The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure.
bootstrapExtra().catch(e => console.error(e));

// popups
let currentPopup: any = undefined;
const today = new Date();
const time = today.getHours() + ":" + today.getMinutes();

function closePopUp(){
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}

WA.room.onEnterZone('clock', () => {
    currentPopup =  WA.ui.openPopup("clockPopup","It's " + time,[]);
});

WA.room.onLeaveZone('clock', closePopUp);

WA.room.onEnterZone('djbooth', () => {
    currentPopup =  WA.ui.openPopup("djboothPopup","Now playing: Nine Inch Nails (from the album The Slip, CC BY-NC-SA)",[]);
});
WA.room.onLeaveZone('djbooth', closePopUp);

// chatbots

let currentBot: any = undefined;
let lastMessage: string = "";

let recruitmentWelcome: boolean = false;
const recruitmentWelcomeMessage = "Greetings, mortal! What a nice day to join C3S, isn't it? You may proceed to the key, if you want to apply for membership. You can ask me one-word questions beginning with 'w' otherwise.";
const rectuitmentDontKnow = "I don't know an answer to '";
const recruitmentPrompt = "If I understand you right, you are asking: ";
WA.room.onEnterZone('recruitment', () => {
    currentBot = "Recruitment Officer";
    if (!recruitmentWelcome)
        WA.chat.sendChatMessage(recruitmentWelcomeMessage, currentBot);
    else
        recruitmentWelcome = true;
});
WA.room.onLeaveZone('recruitment',  () => {
    currentBot = undefined;
});
function recruitmentAnswer(m: string) {
    if (m == "why" || m == "warum") return recruitmentPrompt + "Why you should become a member? If you are a music-prducing being, C3S needs your repertoire *now* to proof to autorities that it can sustain its business as a collecting society. Best soultion for this is to become a full member. Of course, if you don't do music, you can become investing member to support us in other ways (you will not have the right to vote on general assemblies but you may attend there).";
    if (m == "when" || m == "wann") return recruitmentPrompt + "When will be the best time to join? Now, of course! Oh, you mean when will we start operation?... Well, we spent 2021 writing a very sophisticated business plan to be approved by the authorities and maybe 2022 we'll start with a live tariff. (I know we sometimes used to tell people 'next year' or so before, when we were not aware of all implications, but now it may actually be within reach.)";
    if (m == "where" || m == "wo") return recruitmentPrompt + "Where we will become operational? First, in Germany; then we'll start field offices in other European countries. Currently our office is located in Düsseldorf.";
    if (m == "what" || m == "was") return recruitmentPrompt + "What is C3S all about? Now... C3S is about to become a music collective society. A collecting societies task is to allow everyone to use copyright-protected works without the user making contracts with each and every copyright holder. The user needs to license the use of works unter certain tariffs. C3S' speciality is that it allows the use of CC licenses -- but we want to also make a difference in other aspects like transparency or freedom to decide which works a rightsholder wants to let us manage.";
    if (m == "who" || m == "wer") return recruitmentPrompt + "Who is behind the C3S? Originating from a grass-roots kind of movement, our activists work on a honorary base (except for one office employee occupied wiht the buerocratic tasks a cooperative is faced with). C3S is a DIY-collecting society (in formation) and is open to anyone who can help. Just contact us, introduce yourself, and tell us what you strength is!";
    //if (m == "w" || m == "w")) return recruitmentPrompt + "";

    return rectuitmentDontKnow + m + "'";
}

WA.chat.onChatMessage((m => {
    if (currentBot == "Recruitment Officer")
        if (m != recruitmentWelcomeMessage && m != lastMessage
            && m.substring(0, rectuitmentDontKnow.length) != rectuitmentDontKnow
            && m.substring(0, recruitmentPrompt.length) != recruitmentPrompt)
        {
            lastMessage = m;
            WA.chat.sendChatMessage(recruitmentAnswer(m), currentBot);
        }
}));
