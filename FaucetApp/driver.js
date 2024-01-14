import { AriABI } from "./abi.js";

let signer;
let provider;
let connAddress;

async function connectWithMetaMsk() {
    try {
        console.log("connectWithMetaMsk() triggered");
        provider = new ethers.providers.Web3Provider(window.ethereum);
        console.log(provider);

        // Request accounts and wait for user interaction
        const accounts = await provider.send("eth_requestAccounts", []);
        console.log("eth_requestAccounts result:", accounts);
        
        // Check if accounts were returned
        if (accounts && accounts.length > 0) {
            // Initialize the signer
            signer = provider.getSigner();
            connAddress = accounts[0]
            console.log(connAddress);

            document.getElementById('ConnectBtn').innerText = "Connected";
            document.getElementById('address-showcase').innerHTML = shortenEthereumAddress(connAddress);
        } else {
            console.log("User didn't approve the account request.");
            alert("Browser wallet not found or user denied the request.");
        }
    } catch (error) {
        console.log(error);
    }
}

function shortenEthereumAddress(address) {
    if (address.length < 12) {
        return address;
    }

    const prefix = address.slice(0, 4);
    const suffix = address.slice(-3);

    return `${prefix}....${suffix}`;
}

async function mintAri() {
    try{
        if(signer){
            const AriAddress = "0x85602B6A64306E2A5519597dC49387450E865f65";
            const AriInstance = new ethers.Contract(AriAddress, AriABI, provider);
            const AriWithSigner = AriInstance.connect(signer);

            tx = await AriWithSigner.faucetGetAri();
        } else {
            await connectWithMetaMsk();
            mintAri();
        }
    } catch(error) {
        console.log(error);
    }
}

document.getElementById('ConnectBtn').addEventListener("click", connectWithMetaMsk);
document.getElementById('MintButton').addEventListener("click", mintAri);
