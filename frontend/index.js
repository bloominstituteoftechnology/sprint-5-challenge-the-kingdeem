//const { default: axios } = require("axios")

async function sprintChallenge5() { // Note the async keyword, in case you wish to use `await` inside sprintChallenge5
  // 👇 WORK WORK BELOW THIS LINE 👇

  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear - 1}`
  
  
  // FETCH LEARNER & MENTOR INFO
  
  const learnersRes = await axios.get('http://localhost:3003/api/learners');
  const mentorsRes = await axios.get('http://localhost:3003/api/mentors');
  //console.log(learnersRes)
    //console.log(learnersRes.data[0].id)
    //console.log(mentorsRes.data[0])

    const info = document.querySelector('.info')
    info.textContent = 'No learner is selected'
    
    const cards = document.querySelector('.cards')  
    // BUILD FUNCTION TO LINK DATA TO LEARNER CARD
    
    // eslint-disable-next-line no-inner-declarations
    function learnerCard(learner) {

      const card = document.createElement('div')
      card.classList.add('card')
      const fullName = document.createElement('h3')
        fullName.textContent = learner.fullName
      const email = document.createElement('div')
        email.textContent = learner.email
      const mentors = document.createElement('h4')
        mentors.textContent = 'Mentors'
      const mentDropdown = document.createElement('ul')
        for (let i = 0; i < learner.mentors.length; i++) {
          for (let j = 0;  j < mentorsRes.data.length; j++) {
            if (learner.mentors[i] === mentorsRes.data[j].id) {
          const mentorList = document.createElement('li')
            mentorList.textContent = `${mentorsRes.data[j].firstName} ${mentorsRes.data[j].lastName}`
            mentDropdown.appendChild(mentorList)
            }
          }
        }
    
      card.appendChild(fullName);
      card.appendChild(email);
      card.appendChild(mentors)
      card.appendChild(mentDropdown)

      cards.appendChild(card)
  
      fullName.style.pointerEvents = 'none'
      email.style.pointerEvents = 'none'
      

      card.addEventListener('click', (evt) => {
        evt.stopPropagation()
        console.log(card)
        card.classList.toggle('selected')
        
        if (card.classList.contains('selected')) {
        fullName.textContent = `${learner.fullName}, ${learner.id}`
        info.textContent = `The selected learner is ${learner.fullName}`
        }
        else {
          fullName.textContent = learner.fullName
          info.textContent = 'No learner is selected'
        }
       
    });
    

      
      mentors.classList.add('closed')
      mentors.addEventListener('click', evt => {
        if (mentors.classList.contains('closed')) {
          mentors.classList.remove('closed')
          mentors.classList.add('open')
        }
        else {
          mentors.classList.remove('open')
          mentors.classList.add('closed')
        }
      })
      
      return card;
    } 
    
 // CREATE LEARNER CARD INFO
 
    for (let i = 0; i < learnersRes.data.length; i++) {
      let learner = {
        id: `ID ${learnersRes.data[i].id}`,
        email: `${learnersRes.data[i].email}`,
        fullName: `${learnersRes.data[i].fullName}`,
        mentors: learnersRes.data[i].mentors
      }     

    learnerCard(learner);
    }
  }
  



  // 👆 WORK WORK ABOVE THIS LINE 👆


// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { sprintChallenge5 }
else sprintChallenge5()
