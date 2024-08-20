module.exports = async function getLocation() {
    const APIResponse = await fetch(`http://ip-api.com/json/`);

    if (APIResponse.status === 200) {
        const data = await APIResponse.json();
        console.log(data)

        return data
    }
};

