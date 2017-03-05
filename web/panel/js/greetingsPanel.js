/*
 * Copyright (C) 2017 phantombot.tv
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/* 
 * @author IllusionaryOne
 */

/*
 * greetingsPanel.js
 * Drives the Greetings Panel
 */
(function() {

   var refreshIcon = '<i class="fa fa-refresh" />',
       spinIcon = '<i style="color: #6136b1" class="fa fa-spinner fa-spin" />',
       settingIcon = [];
       settingIcon['false'] = '<i style="color: #6136b1" class="fa fa-circle-o" />';
       settingIcon['true'] = '<i style="color: #6136b1" class="fa fa-circle" />';

    var greetingToggle = false,
        followerToggle = false,
        subToggle = false,
        reSubToggle = false,
        donationToggle = false,
        streamtipdonationToggle = false,
        donationGroup = false,  
        streamtipdonationGroup = false,         
        gameWhispToggle = false,
        primeSubToggle = false,
        bitsToggle = false,
        bitsRewardMultToggle = false,
        tipeeestreamdonationToggle = false,
        tipeeestreamdonationGroup = false;  
    
    /*
     * onMessage
     * This event is generated by the connection (WebSocket) object.
     */
    function onMessage(message) {
        var msgObject;

        try {
            msgObject = JSON.parse(message.data);
        } catch (ex) {
            return;
        }

        if (panelHasQuery(msgObject)) {
            var key = "",
                value = "";
     
            if (panelCheckQuery(msgObject, 'greetings_greeting')) {
                for (idx in msgObject['results']) {
                    key = msgObject['results'][idx]['key'];
                    value = msgObject['results'][idx]['value'];

                    if (panelMatch(key, 'autoGreetEnabled')) {
                        greetingToggle = value;
                        $('#globalGreetings').html(settingIcon[value]);
                    }
                    if (panelMatch(key, 'cooldown')) {
                        $('#greetingCooldownInput').val((value / 36e5));
                    }
                }
            }

            if (panelCheckQuery(msgObject, 'greetings_followReward')) {
                $('#followerRewardInput').val(msgObject['results']['followReward']);
            }

            if (panelCheckQuery(msgObject, 'greetings_followMessage')) {
                $('#followerGreetingInput').val(msgObject['results']['followMessage']);
            }

            if (panelCheckQuery(msgObject, 'greetings_followToggle')) {
                followToggle = msgObject['results']['followToggle'];
                $('#followerGreetings').html(settingIcon[msgObject['results']['followToggle']]);
            }

            if (panelCheckQuery(msgObject, 'greetings_followDelay')) {
                $('#followDelay').val( msgObject['results']['followDelay']);
            }

            if (panelCheckQuery(msgObject, 'greetings_donation')) {
                for (idx in msgObject['results']) {
                    key = msgObject['results'][idx]['key'];
                    value = msgObject['results'][idx]['value'];

                    if (panelMatch(key, 'announce')) {
                        donationToggle = value;
                        $('#donationGreetings').html(settingIcon[value]);
                    }
                    if (panelMatch(key, 'donationGroup')) {
                        donationGroup = value;
                        $('#donationGroup').html(settingIcon[value]);
                    }
                    if (panelMatch(key, 'donationGroupMin')) {
                        $('#donationGroupMin').val(value);
                    }
                    if (panelMatch(key, 'reward')) {
                        $('#donateRewardInput').val(value);
                    }
                    if (panelMatch(key, 'message')) {
                        $('#donateGreetingInput').val(value);
                    }
                }
            }

            if (panelCheckQuery(msgObject, 'greetings_donationstreamtip')) {
                for (idx in msgObject['results']) {
                    key = msgObject['results'][idx]['key'];
                    value = msgObject['results'][idx]['value'];

                    if (panelMatch(key, 'announce')) {
                        streamtipdonationToggle = value;
                        $('#streamtipGreetings').html(settingIcon[value]);
                    }
                    if (panelMatch(key, 'donationGroup')) {
                        streamtipdonationGroup = value;
                        $('#streamtipdonationGroup').html(settingIcon[value]);
                    }
                    if (panelMatch(key, 'donationGroupMin')) {
                        $('#streamtipdonationGroupMin').val(value);
                    }
                    if (panelMatch(key, 'reward')) {
                        $('#streamtipdonateRewardInput').val(value);
                    }
                    if (panelMatch(key, 'message')) {
                        $('#streamtipdonateGreetingInput').val(value);
                    }
                }
            }

            if (panelCheckQuery(msgObject, 'greetings_tipeeestream')) {
                for (idx in msgObject['results']) {
                    key = msgObject['results'][idx]['key'];
                    value = msgObject['results'][idx]['value'];

                    if (panelMatch(key, 'toggle')) {
                        tipeeestreamdonationToggle = value;
                        $('#tipeeestreamGreetings').html(settingIcon[value]);
                    }
                    if (panelMatch(key, 'group')) {
                        tipeeestreamdonationGroup = value;
                        $('#tipeeestreamdonationGroup').html(settingIcon[value]);
                    }
                    if (panelMatch(key, 'groupMin')) {
                        $('#tipeeestreamdonationGroupMin').val(value);
                    }
                    if (panelMatch(key, 'reward')) {
                        $('#tipeeestreamdonateRewardInput').val(value);
                    }
                    if (panelMatch(key, 'message')) {
                        $('#tipeeestreamdonateGreetingInput').val(value);
                    }
                }
            }

            if (panelCheckQuery(msgObject, 'greetings_subscribers')) {
                for (idx in msgObject['results']) {
                    key = msgObject['results'][idx]['key'];
                    value = msgObject['results'][idx]['value'];

                    if (panelMatch(key, 'subscribeMessage')) {
                        $('#subGreetingInput').val(value);
                    }
                    if (panelMatch(key, 'primeSubscribeMessage')) {
                        $('#primeSubGreetingInput').val(value);
                    }
                    if (panelMatch(key, 'reSubscribeReward')) {
                        $('#reSubRewardInput').val(value);
                    }
                    if (panelMatch(key, 'reSubscribeMessage')) {
                        $('#resubGreetingInput').val(value);
                    }
                    if (panelMatch(key, 'subscriberWelcomeToggle')) {
                        subToggle = value;
                        $('#subscriptionGreetings').html(settingIcon[value]);
                    }
                    if (panelMatch(key, 'primeSubscriberWelcomeToggle')) {
                        primeSubToggle = value;
                        $('#primeSubscriptionGreetings').html(settingIcon[value]);
                    }
                    if (panelMatch(key, 'reSubscriberWelcomeToggle')) {
                        reSubToggle = value;
                        $('#resubscriptionGreetings').html(settingIcon[value]);
                    }
                    if (panelMatch(key, 'subscribeReward')) {
                        $('#subRewardInput').val(value);
                    }
                    if (panelMatch(key, 'resubEmote')) {
                        $('#resubEmoteInput').val(value);
                    }
                }
            }

            if (panelCheckQuery(msgObject, 'greetings_gamewisp')) {
                for (idx in msgObject['results']) {
                    key = msgObject['results'][idx]['key'];
                    value = msgObject['results'][idx]['value'];

                    if (panelMatch(key, 'subscriberShowMessages')) {
                        gameWhispToggle = value;
                        $('#gameWispGreetings').html(settingIcon[value]);
                    }
                    if (panelMatch(key, 'subscribeMessage')) {
                        $('#gwSubGreetingInput').val(value);
                    }
                    if (panelMatch(key, 'reSubscribeMessage')) {
                        $('#gwResubGreetingInput').val(value);
                    }
                    if (panelMatch(key, 'tierUpMessage')) {
                        $('#gwTierupGreetingInput').val(value);
                    }
                    if (panelMatch(key, 'subscribeReward')) {
                        $('#gwSubRewardInput').val(value);
                    }
                    if (panelMatch(key, 'reSubscribeReward')) {
                        $('#gwResubRewardInput').val(value);
                    }
                }
            }

            if (panelCheckQuery(msgObject, 'greetings_bits')) {
                for (idx in msgObject['results']) {
                    key = msgObject['results'][idx]['key'];
                    value = msgObject['results'][idx]['value'];

                    if (panelMatch(key, 'toggle')) {
                        bitsToggle = value;
                        $('#bitsToggle').html(settingIcon[value]);
                    }
                    if (panelMatch(key, 'rewardMultToggle')) {
                        bitsRewardMultToggle = value;
                        $('#bitsRewardMultToggle').html(settingIcon[value]);
                    }
                    if (panelMatch(key, 'message')) {
                        $('#bitsMessage').val(value);
                    }
                    if (panelMatch(key, 'reward')) {
                        $('#bitsReward').val(value);
                    }
                    if (panelMatch(key, 'minimum')) {
                        $('#bitsMinimum').val(value);
                    }
                }
            }

            if (panelCheckQuery(msgObject, 'greetings_gamewispTiers')) {
                var tier = "",
                    html = "",
                    songRequestHtml = "<table>",
                    bonusPointsHtml = "<table>",
                    subBonusPointsHtml = "<table>";
 
                for (idx in msgObject['results']) {
                    key = msgObject['results'][idx]['key'];
                    value = msgObject['results'][idx]['value'];
                    tier = key[key.indexOf('_') + 1];
                    html = '<tr class="textList">' +
                           '    <td>Rang ' + tier + '</td>' +
                           '    <td style="vertical-align: middle">' +
                           '        <input type="number" min="0" id="inline_' + key + '"' +
                           '               placeholder="' + value + '" value="' + value + '"' +
                           '               style="width: 8em" />' +
                           '        <button type="button" class="btn btn-default btn-xs"' +
                           '                onclick="$.updateGWTierData(\'' + key + '\')"><i class="fa fa-pencil" />' +
                           '        </button>' +
                           '    </td>' +
                           '</tr>';
                    if (key.startsWith('songrequest_') === true) { songRequestHtml += html; }
                    if (key.startsWith('bonuspoints_') === true) { bonusPointsHtml += html; }
                    if (key.startsWith('subbonuspoints_') === true) { subBonusPointsHtml += html; }
                }

                $('#gameWispSongRequests').html(songRequestHtml);
                $('#gameWispBonusPoints').html(bonusPointsHtml);
                $('#gameWispSubBonusPoints').html(subBonusPointsHtml);
                handleInputFocus();
            }
        }
    }

    /**
     * @function doQuery
     */
    function doQuery() {
        sendDBKeys('greetings_greeting', 'greeting');
        sendDBQuery('greetings_followReward', 'settings', 'followReward');
        sendDBQuery('greetings_followMessage', 'settings', 'followMessage');
        sendDBQuery('greetings_followToggle', 'settings', 'followToggle');
        sendDBQuery('greetings_followDelay', 'settings', 'followDelay');
        sendDBKeys('greetings_donation', 'donations');
        sendDBKeys('greetings_donationstreamtip', 'streamtip');
        sendDBKeys('greetings_subscribers', 'subscribeHandler');
        sendDBKeys('greetings_gamewisp', 'gameWispSubHandler');
        sendDBKeys('greetings_gamewispTiers', 'gameWispTiers');
        sendDBKeys('greetings_bits', 'bitsSettings');
        sendDBKeys('greetings_tipeeestream', 'tipeeeStreamHandler');
    }

    /**
     * @function updateGWTierData
     * @param {String} key
     */
    function updateGWTierData(key) {
        var value = $('#inline_' + key).val();

        if (value.length > 0) {
            sendDBUpdate('greetings_updateTier', 'gameWispTiers', key, value);
            setTimeout(function() { sendCommand('gamewisppanelupdate'); doQuery(); }, TIMEOUT_WAIT_TIME);
        }
    }

    /**
     * @function toggleGreetings
     * @param {String} table
     * @param {String} key
     */
    function toggleGreetings(table, key) {
        if (panelMatch(table, 'greeting')) {
            $('#globalGreetings').html(spinIcon);
            if (greetingToggle == "true") {
                sendDBUpdate('greetings_greeting', 'greeting', 'autoGreetEnabled', 'false');
            } else {
                sendDBUpdate('greetings_greeting', 'greeting', 'autoGreetEnabled', 'true');
            }
            setTimeout(function() { sendCommand('greetingspanelupdate'); }, TIMEOUT_WAIT_TIME);
        }
        if (panelMatch(table, 'settings')) { // Confusing? Follow is in the settings table.
            $('#followerGreetings').html(spinIcon);
            if (followToggle == "true") {
                sendDBUpdate('greetings_greeting', 'settings', 'followToggle', 'false');
            } else {
                sendDBUpdate('greetings_greeting', 'settings', 'followToggle', 'true');
            }
            setTimeout(function() { sendCommand('followerpanelupdate'); }, TIMEOUT_WAIT_TIME);
        }
        if (panelMatch(table, 'donations')) {
            $('#donationGreetings').html(spinIcon);
            if (donationToggle == "true") {
                sendDBUpdate('greetings_greeting', 'donations', 'announce', 'false');
            } else {
                sendDBUpdate('greetings_greeting', 'donations', 'announce', 'true');
            }
            setTimeout(function() { sendCommand('donationpanelupdate'); }, TIMEOUT_WAIT_TIME);
        }
        if (panelMatch(table, 'streamtip')) {
            $('#streamtipGreetings').html(spinIcon);
            if (streamtipdonationToggle == "true") {
                sendDBUpdate('greetings_greeting', 'streamtip', 'announce', 'false');
            } else {
                sendDBUpdate('greetings_greeting', 'streamtip', 'announce', 'true');
            } 
            setTimeout(function() { sendCommand('donationpanelupdatestreamtip'); }, TIMEOUT_WAIT_TIME);
        }

        if (panelMatch(table, 'tipeeestream')) {
            $('#tipeeestreamGreetings').html(spinIcon);
            if (tipeeestreamdonationToggle == "true") {
                sendDBUpdate('greetings_greeting', 'tipeeeStreamHandler', 'toggle', 'false');
            } else {
                sendDBUpdate('greetings_greeting', 'tipeeeStreamHandler', 'toggle', 'true');
            } 
            setTimeout(function() { sendCommand('tipeeestreamreload'); }, TIMEOUT_WAIT_TIME);
        }
        if (panelMatch(table, 'donationGroup')) {
            $('#donationGroup').html(spinIcon);
            if (donationGroup == "true") {
                sendDBUpdate('greetings_greeting', 'donations', 'donationGroup', 'false');
            } else {
                sendDBUpdate('greetings_greeting', 'donations', 'donationGroup', 'true');
            }
            setTimeout(function() { sendCommand('donationpanelupdate'); }, TIMEOUT_WAIT_TIME);
        }
        if (panelMatch(table, 'streamtipdonationGroup')) {
            $('#streamtipdonationGroup').html(spinIcon);
            if (streamtipdonationGroup == "true") {
                sendDBUpdate('greetings_greeting', 'streamtip', 'donationGroup', 'false');
            } else {
                sendDBUpdate('greetings_greeting', 'streamtip', 'donationGroup', 'true');
            }
            setTimeout(function() { sendCommand('donationpanelupdatestreamtip'); }, TIMEOUT_WAIT_TIME);
        }
        if (panelMatch(table, 'tipeeestreamdonationGroup')) {
            $('#tipeeestreamdonationGroup').html(spinIcon);
            if (tipeeestreamdonationGroup == "true") {
                sendDBUpdate('greetings_greeting', 'tipeeeStreamHandler', 'group', 'false');
            } else {
                sendDBUpdate('greetings_greeting', 'tipeeeStreamHandler', 'group', 'true');
            }
            setTimeout(function() { sendCommand('tipeeestreamreload'); }, TIMEOUT_WAIT_TIME);
        }
        if (panelMatch(table, 'subscribeHandler') && panelMatch(key, 'subscriberWelcomeToggle')) { 
            $('#subscriptionGreetings').html(spinIcon);
            if (subToggle == "true") {
                sendDBUpdate('greetings_greeting', 'subscribeHandler', 'subscriberWelcomeToggle', 'false');
            } else {
                sendDBUpdate('greetings_greeting', 'subscribeHandler', 'subscriberWelcomeToggle', 'true');
            }
            setTimeout(function() { sendCommand('subscriberpanelupdate'); }, TIMEOUT_WAIT_TIME);
        }
        if (panelMatch(table, 'subscribeHandler') && panelMatch(key, 'primeSubscriberWelcomeToggle')) { 
            $('#primeSubscriptionGreetings').html(spinIcon);
            if (primeSubToggle == "true") {
                sendDBUpdate('greetings_greeting', 'subscribeHandler', 'primeSubscriberWelcomeToggle', 'false');
            } else {
                sendDBUpdate('greetings_greeting', 'subscribeHandler', 'primeSubscriberWelcomeToggle', 'true');
            }
            setTimeout(function() { sendCommand('subscriberpanelupdate'); }, TIMEOUT_WAIT_TIME);
        }
        if (panelMatch(table, 'subscribeHandler') && panelMatch(key, 'reSubscriberWelcomeToggle')) { 
            $('#resubscriptionGreetings').html(spinIcon);
            if (reSubToggle == "true") {
                sendDBUpdate('greetings_greeting', 'subscribeHandler', 'reSubscriberWelcomeToggle', 'false');
            } else {
                sendDBUpdate('greetings_greeting', 'subscribeHandler', 'reSubscriberWelcomeToggle', 'true');
            }
            setTimeout(function() { sendCommand('subscriberpanelupdate'); }, TIMEOUT_WAIT_TIME);
        }
        if (panelMatch(table, 'bitsSettings') && panelMatch(key, 'toggle')) { 
            $('#bitsToggle').html(spinIcon);
            if (bitsToggle == "true") {
                sendDBUpdate('greetings_bits', 'bitsSettings', 'toggle', 'false');
            } else {
                sendDBUpdate('greetings_bits', 'bitsSettings', 'toggle', 'true');
            }
            setTimeout(function() { sendCommand('reloadbits'); }, TIMEOUT_WAIT_TIME);
        }
        if (panelMatch(table, 'bitsSettings') && panelMatch(key, 'rewardMultToggle')) { 
            $('#bitsRewardMultToggle').html(spinIcon);
            if (bitsRewardMultToggle == "true") {
                sendDBUpdate('greetings_bits', 'bitsSettings', 'rewardMultToggle', 'false');
            } else {
                sendDBUpdate('greetings_bits', 'bitsSettings', 'rewardMultToggle', 'true');
            }
            setTimeout(function() { sendCommand('reloadbits'); }, TIMEOUT_WAIT_TIME);
        }
        if (panelMatch(table, 'gameWispSubHandler')) { 
            $('#gameWispGreetings').html(spinIcon);
            if (gameWhispToggle == "true") {
                sendDBUpdate('greetings_greeting', 'gameWispSubHandler', 'subscriberShowMessages', 'false');
            } else {
                sendDBUpdate('greetings_greeting', 'gameWispSubHandler', 'subscriberShowMessages', 'true');
            }
            setTimeout(function() { sendCommand('gamewisppanelupdate'); }, TIMEOUT_WAIT_TIME);
        }
        setTimeout(function() { doQuery(); }, TIMEOUT_WAIT_TIME);
    }

    /**
     * @function updateGreetingData
     * @param {String} inputId
     * @param {String} table
     * @param {String} key
     */
    function updateGreetingData(inputId, table, key) {
        var value = $('#' + inputId).val();

        if (inputId == "greetingCooldownInput") {
            if (value.length > 0) {
                value = String(value * 36e5);
                sendDBUpdate('greetings_update', 'greeting', 'cooldown', value);
                setTimeout(function() { doQuery(); sendCommand('greetingspanelupdate'); }, TIMEOUT_WAIT_TIME);
                return;
            }
        }

        if (key == 'followDelay') {
            if (parseInt(value) < 5) {
                document.getElementById(inputId).type = 'text';
                $('#' + inputId).val('Die Follower Verzögerung kann nicht weniger als 5 Sekunden betragen!');
                setTimeout(function() { doQuery(); document.getElementById(inputId).type = 'number'; }, TIMEOUT_WAIT_TIME * 4);
                return;
            }
        }

        if (value.length > 0) {
            sendDBUpdate('greetings_update', table, key, value);

            if (panelMatch(table, 'greeting')) {
                sendCommand('greetingspanelupdate');
            }
            if (panelMatch(table, 'settings')) { // Confusing? Follow is in the settings table.
                sendCommand('followerpanelupdate');
            }
            if (panelMatch(table, 'donations')) {
                sendCommand('donationpanelupdate');
            }
            if (panelMatch(table, 'streamtip')) {
                sendCommand('donationpanelupdatestreamtip');
            }
            if (panelMatch(table, 'subscribeHandler')) {
                sendCommand('subscriberpanelupdate');
            }
            if (panelMatch(table, 'bitsSettings')) {
                sendCommand('reloadbits');
            }
            if (panelMatch(table, 'tipeeeStreamHandler')) {
                sendCommand('tipeeestreamreload');
            }
            if (panelMatch(table, 'gameWispSubHandler')) {
                sendCommand('gamewisppanelupdate');
            }
            setTimeout(function() { doQuery(); }, TIMEOUT_WAIT_TIME * 2);
        } 
    }


    // Import the HTML file for this panel.
    $('#greetingsPanel').load('/panel/greetings.html');

    // Load the DB items for this panel, wait to ensure that we are connected.
    var interval = setInterval(function() {
        if (isConnected && TABS_INITIALIZED) {
            var active = $("#tabs").tabs("option", "active");
            if (active == 7) {
                doQuery();
                clearInterval(interval);
            }
        }
    }, INITIAL_WAIT_TIME);

    // Query the DB every 30 seconds for updates.
    setInterval(function() {
        var active = $('#tabs').tabs('option', 'active');
        if (active == 7 && isConnected && !isInputFocus()) {
            newPanelAlert('Aktualisiere Begrüßungs-Daten...', 'success', 1000);
            doQuery();
        }
    }, 3e4);

    // Export functions - Needed when calling from HTML.
    $.greetingsOnMessage = onMessage;
    $.greetingsDoQuery = doQuery;
    $.toggleGreetings = toggleGreetings;
    $.updateGreetingData = updateGreetingData;
    $.updateGWTierData = updateGWTierData;
})();
