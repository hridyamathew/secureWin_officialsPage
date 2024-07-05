
  window.addEventListener('load', async () => {
    // Modern dapp browsers...
    if (window.ethereum) {
      window.web3 = new Web3(ethereum);
      try {
        // Request account access if needed
        await ethereum.enable();
        // Acccounts now exposed
        console.log("DApp connected");
      } catch (error) {
        // User denied account access...
        console.error("User denied account access");
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      window.web3 = new Web3(web3.currentProvider);
      // Acccounts always exposed
      console.log("DApp connected");
    }
    // Non-dapp browsers...
    else {
      console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
  });

  const contractAddress = "0x98ab95c45366d6D6E389bb4076de081F242Ec0dC";
  const abi = [
    {
      "inputs": [
        {
          "internalType": "string[]",
          "name": "ticketNumbers",
          "type": "string[]"
        },
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "phoneNumber",
          "type": "string"
        }
      ],
      "name": "storeTicketDetails",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "ticketNumber",
          "type": "string"
        }
      ],
      "name": "getTicketDetails",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        }
      ],
      "name": "getTicketNumbersByName",
      "outputs": [
        {
          "internalType": "string[]",
          "name": "",
          "type": "string[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "name": "ticketDetailsMap",
      "outputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "phoneNumber",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];

  async function getTicketDetails(ticketNumber) {
    const contract = new web3.eth.Contract(abi, contractAddress);
    try {
      const details = await contract.methods.getTicketDetails(ticketNumber).call();
      return details; // returns [name, phoneNumber]
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  
  const TWILIO_SID = 'AC1dcc878ad385bd458924c64d4dbed8f9';
const TWILIO_AUTH_TOKEN = '8e24a8014b765dd9ad55dd99268a850e';
const TWILIO_PHONE_NUMBER = '+1 689 319 7471';

// Function to send SMS via Twilio
async function sendSMS(toPhoneNumber, message) {
    const url = `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_SID}/Messages.json`;
    const data = new URLSearchParams();
    data.append('To', toPhoneNumber); // Adding +91 for India
    data.append('From', TWILIO_PHONE_NUMBER);
    data.append('Body', message);

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': 'Basic ' + btoa(`${TWILIO_SID}:${TWILIO_AUTH_TOKEN}`)
            },
            body: data
        });
        
        if (response.ok) {
            console.log(`SMS sent successfully to ${toPhoneNumber}`);
            return true;
        } else {
            console.error('Failed to send SMS:', response.statusText);
            return false;
        }
    } catch (error) {
        console.error('Error sending SMS:', error);
        return false;
    }
}

// Event listener for form submission
document.querySelector('form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const lotteryType = document.getElementById('lottery-type').value;
    const firstPrizeTicket = document.getElementById('first-prize').value;
    const secondPrizeTicket = document.getElementById('second-prize').value;

    const firstPrizeDetails = await getTicketDetails(firstPrizeTicket);
    const secondPrizeDetails = await getTicketDetails(secondPrizeTicket);

    if (firstPrizeDetails) {
        const firstPrizeMessage = `Congratulations ${firstPrizeDetails[0]}!! You have won first prize of ${lotteryType} lottery for the ticket number ${firstPrizeTicket}. Kindly contact the lottery department and claim the prize within one week. Make sure to bring ID proof.`;
        
        // Send SMS to first prize winner
        const smsSent1 = await sendSMS(firstPrizeDetails[1], firstPrizeMessage);
        if (smsSent1) {
            alert(`SMS sent to ${firstPrizeDetails[0]} at ${firstPrizeDetails[1]}`);
        } else {
            alert(`Failed to send SMS to ${firstPrizeDetails[0]} at ${firstPrizeDetails[1]}. Please check console for details.`);
        }
    }

    if (secondPrizeDetails) {
        const secondPrizeMessage = `Congratulations ${secondPrizeDetails[0]}!! You have won second prize of ${lotteryType} lottery for the ticket number ${secondPrizeTicket}. Kindly contact the lottery department and claim the prize within one week. Make sure to bring ID proof.`;
        
        // Send SMS to second prize winner
        const smsSent2 = await sendSMS(secondPrizeDetails[1], secondPrizeMessage);
        if (smsSent2) {
            alert(`SMS sent to ${secondPrizeDetails[0]} at ${secondPrizeDetails[1]}`);
        } else {
            alert(`Failed to send SMS to ${secondPrizeDetails[0]} at ${secondPrizeDetails[1]}. Please check console for details.`);
        }
    }
});
