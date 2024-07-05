
      // Initialize Web3 with your provider (e.g., MetaMask)

      if (typeof web3 !== "undefined") {
        web3 = new Web3(web3.currentProvider);
      } else {
        // If no injected web3 instance is detected, fallback to localhost
        web3 = new Web3(
          new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545")
        );
      }

      // Load your contract ABI and address
      var contractABI = [
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
      var contractAddress = "0x98ab95c45366d6D6E389bb4076de081F242Ec0dC";

      // Initialize the contract instance
      var contract = new web3.eth.Contract(contractABI, contractAddress);

      // Function to search for ticket details
      function searchTicket(event) {
        event.preventDefault();
        
        var ticketNumber = document.getElementById("ticketNumber").value;
        var loadingIcon = document.getElementById('loading-icon');

        loadingIcon.style.display = 'block';
        setTimeout(async function() {
          // Hide loading icon
          loadingIcon.style.display = 'none';
  
          try {
            // Call the getTicketDetails function from the contract
            var result = await contract.methods
              .getTicketDetails(ticketNumber)
              .call();
              console.log('Name:',result[0])
              console.log('Phone:',result[1])
            document.getElementById("details").innerHTML = `
            <p style="font-weight: medium;">Ticket Number: ${ticketNumber}</p>
              <p style="font-weight: medium;">Name: ${result[0]}</p>
              <p style="font-weight: medium;">Phone Number: ${result[1]}</p>
            `;
          } catch (error) {
            console.error("Error fetching ticket details:", error);
          }
          document.querySelector('.ticket').style.display = 'flex';
        }, 3000); 
  
      }


      
      // function verifyOTP() {
      //   var enteredOTP = document
      //     .getElementById("otp")
      //     .querySelector("input").value;
      //   var storedOTP = document.getElementById("otp").dataset.otp;

      //   if (enteredOTP === storedOTP) {
      //     alert("OTP Verified Successfully!");
      //   } else {
      //     alert("Incorrect OTP. Please try again.");
      //   }
      // }

      // function handleTimeout() {
      //   document.getElementById("otp").querySelector("input").value = "";
      //   document.getElementById("otp").removeAttribute("data-otp");
      //   alert("OTP verification timed out. Please try again.");
      // }

      // function startOTPVerification() {
      //   var timerElement = document.getElementById("otp-timer");
      //   var seconds = 60; // Set the timer duration in seconds
      //   var timer = setInterval(function () {
      //     seconds--;
      //     timerElement.textContent = "Time left: " + seconds + "s";
      //     if (seconds <= 0) {
      //       document.getElementById("send-otp-btn").textContent = "Resend otp";
      //       clearInterval(timer);
      //       handleTimeout();
      //     }
      //   }, 1000);

      //   document
      //     .getElementById("verify-btn")
      //     .addEventListener("click", function (event) {
      //       event.preventDefault();
      //       document.getElementById("otp-timer").textContent = " ";
      //       verifyOTP();
      //       clearInterval(timer);
      //     });
      // }

      // document
      //   .getElementById("send-otp-btn")
      //   .addEventListener("click", function (event) {
      //     event.preventDefault();
      //     sendOTP();
      //     startOTPVerification();
      //   });
      


      


      
