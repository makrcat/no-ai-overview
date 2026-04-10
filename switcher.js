//@ts-check

const RULESET_MAP = {
    'flag': 'ruleset_flag',
    'udm': 'ruleset_udm'
};

document.addEventListener('change', (event) => {
    //@ts-ignore
    const checkboxid = event.target.id;
    //@ts-ignore
    const ruleset = RULESET_MAP[checkboxid];
    //@ts-ignore
    let parameter = event.target.checked ? 'enableRulesetIds' : 'disableRulesetIds';

    //@ts-ignore
    chrome.declarativeNetRequest.updateEnabledRulesets({
        [parameter]: [ruleset]
    });

    //@ts-ignore
    chrome.storage.local.set({ [checkboxid]: event.target.checked });
});

//@ts-ignore
chrome.storage.local.get(Object.keys(RULESET_MAP), (result) => {
    for (const [id, value] of Object.entries(result)) {
        //@ts-ignore
        document.getElementById(id).checked = value;
    }
});
