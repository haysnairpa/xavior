export const motivationalLetterPromptParser = (input) => {
  const motivations = input.motivations.map((motivation, index) => `${index + 1}. Motivation: ${motivation.motivation} Contribution plan related to my motivation: ${motivation.plan}`).join("\n");
  
  const result = `
  
  Create a study plan essay for me applying ${input.degree} at ${input.institution} with the following informations:
  
  - My motivation: ${input.motivation}
  - My background: ${input.background}
  - These are my motivations why I want to apply for this degree:
  
      ${courses}
  
  - My advantages: ${input.advantages}
  `
  
  return result;

}

export const personalStatementPromptParser = (input) => {
  const experiences = input.experiences.map((experience, index) => `${index + 1}. Experience: ${experience.experience} Detail: ${experience.detail}`).join("\n");
  const achievements = input.achievements.map((achievement, index) => `${index + 1}. Achievement: ${achievement.achievement} Detail: ${achievement.detail}`).join("\n");
  
  const result = `
  
  Create a study plan essay for me applying ${input.degree} at ${input.institution} with the following informations:
  
  - My motivation: ${input.motivation}
  - My background: ${input.background}
  - My advantages: ${input.advantages}
  - My experiences:
  
      ${experiences}
      
  - My achievements:
      
      ${achievements}
  `
  
  return result;

}

export const studyPlanPromptParser = (input) => {
  const courses = input.courses.map((course, index) => `${index + 1}. Course: ${course.course} Reason: ${course.reason}`).join("\n");
  const plans = input.plans.map((plan, index) => `${index + 1}. Course: ${plan.plan} Reason: ${plan.reason}`).join("\n");

  const result = `

  Create a study plan essay for applying ${input.degree} at ${input.institution} with the following informations:

  - My motivation: ${input.motivation}
  - My background: ${input.background}
  - The course I planned to take while pursuing the degree:

      ${courses}
      
  - The other agenda I also planned to do while pursuing the degree:
      
      ${plans}
  `

  return result;

}