//const { default: axios } = require("axios")

async function sprintChallenge5() { // Note the async keyword, in case you wish to use `await` inside sprintChallenge5
  // 👇 WORK WORK BELOW THIS LINE 👇

  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear - 1}`
  
  try {
  // FETCH LEARNER & MENTOR INFO
  
  const learnersRes = await axios.get('http://localhost:3003/api/learners');
  const mentorsRes = await axios.get('http://localhost:3003/api/mentors');

    console.log(learnersRes.data[0].id)
    //console.log(mentorsRes.data)

    document.querySelector('.info').textContent = 'No learner is selected'
    const section = document.querySelector('section')
    const cards = document.querySelectorAll('.cards')    

    // BUILD FUNCTION TO LINK DATA TO LEARNER CARD
    
    function learnerCard(learner) {
      const card = document.createElement('div')
      card.classList.add('card')
      const fullName = document.createElement('h3')
      fullName.textContent = learner.fullName
      const email = document.createElement('div')
      email.textContent = learner.email
      const mentors = document.createElement('h4')
      mentors.textContent = 'Mentors'
     // const mentDropdown = document.createElement('ul')
     // const ment1 = document.createElement('li')
     // const ment2 = document.createElement('li')
      card.appendChild(fullName);
      card.appendChild(email);
      card.appendChild(mentors)
      return card;
    } 

 // CREATE LEARNER CARD INFO
 
    for (let i = 0; i < learnersRes.data.length; i++) {
      let learner = {
        id: `ID ${learnersRes.data[i].id}`,
        email: `${learnersRes.data[i].email}`,
        fullName: `${learnersRes.data[i].fullName}`,
        //mentors: ['']
      }

      learnerCard(learner)
      cards.forEach(card => {
      const newLearner = learnerCard(learner);
      card.appendChild(newLearner)
    })
    }

    // BUILD INTERACTIVITY
    
    
  }
  
  catch (err) {
  console.log('Error: ', err.message)
  }


  // 👆 WORK WORK ABOVE THIS LINE 👆
}

// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { sprintChallenge5 }
else sprintChallenge5()
