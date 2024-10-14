import React from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"

export const PersonalStatementForm = ({ handleSubmit, parameter, setParameter}) => {
    return (
        <div>
            <label htmlFor="studyProgram" className="my-2">Study Program</label>
            <Input
                id="studyProgram"
                type="text"
                className="my-2 bg-white dark:bg-transparent text-gray-900 dark:text-white"
                value={parameter.studyProgram}
                onChange={(e) => {
                    setParameter({
                        ...parameter,
                        studyProgram: e.target.value
                    })
                }}
            />
            <label htmlFor="institution" className="my-2">Institution Name</label>
            <Input
                id="institution"
                type="text"
                className="my-2 bg-white dark:bg-transparent text-gray-900 dark:text-white"
                value={parameter.institution}
                onChange={(e) => {
                    setParameter({
                        ...parameter,
                        institution: e.target.value
                    })
                }}            
            />
            <Textarea
                placeholder="Your educational background here"
                id="educationalBackground"
                className="my-2 min-h-[150px] bg-white dark:bg-transparent text-gray-900 dark:text-white"
                value={parameter.background}
                onChange={(e) => {
                    setParameter({
                        ...parameter,
                        background: e.target.value
                    })
                }}
            />
            <Textarea
                placeholder="Your advantages here"
                id="advantages"
                className="my-2 min-h-[150px] bg-white dark:bg-transparent text-gray-900 dark:text-white"
                value={parameter.advantages}
                onChange={(e) => {
                    setParameter({
                        ...parameter,
                        advantages: e.target.value
                    })
                }}
            />
            {parameter.experiences.map((experience, index) => {
                return(
                    <div key={index}>
                        <label htmlFor={`experience-${index+1}`}>{index + 1}. Experience</label>
                        <Input
                            id={`experience-${index+1}`}
                            type="text"
                            className="mx-3 my-3 bg-white dark:bg-transparent text-gray-900 dark:text-white"
                            value={experience.experience}
                            onChange={(e) => {
                                const newExperiences = [...parameter.experiences];
                                newExperiences[index].experience = e.target.value;
                                setParameter({
                                    ...parameter,
                                    experiences: newExperiences
                                });
                            }}
                        />
                        <label htmlFor={`experienceDetail-${index+1}`}> Detail</label>
                        <Textarea
                            placeholder="Your details here"
                            id={`experienceDetail-${index+1}`}
                            className="my-2 min-h-[150px] bg-white dark:bg-transparent text-gray-900 dark:text-white"
                            value={experience.detail}
                            onChange={(e) => {
                                const newExperiences = [...parameter.experiences];
                                newExperiences[index].detail = e.target.value;
                                setParameter({
                                    ...parameter,
                                    experiences: newExperiences
                                });
                            }}
                        />
                    </div>
                )
            })}
            <Button
                type="button"
                className="my-3 w-full bg-black hover:bg-gray-700 text-white dark:bg-white dark:hover:bg-gray-400 dark:text-black"
                onClick={() => setParameter({
                    ...parameter,
                    experiences: [
                        ...parameter.experiences,
                        {
                            experience: "",
                            detail: ""
                        }
                    ]
                })}
            >
                Add experiences
            </Button>
            {parameter.achievements.map((achievement, index) => {
                return(
                    <div key={index}>
                        <label htmlFor={`achievement-${index+1}`}>{index + 1}. Achievement</label>
                        <Input
                            id={`achievement-${index+1}`}
                            type="text"
                            className="mx-3 my-3 bg-white dark:bg-transparent text-gray-900 dark:text-white"
                            value={achievement.achievement}
                            onChange={(e) => {
                                const newAchievements = [...parameter.achievements];
                                newAchievements[index].achievement = e.target.value;
                                setParameter({
                                    ...parameter,
                                    achievements: newAchievements
                                });
                            }}
                        />
                        <label htmlFor={`achievementDetail-${index+1}`}> Detail</label>
                        <Textarea
                            placeholder="Your details here"
                            id={`achievementDetail-${index+1}`}
                            className="my-2 min-h-[150px] bg-white dark:bg-transparent text-gray-900 dark:text-white"
                            value={achievement.detail}
                            onChange={(e) => {
                                const newAchievements = [...parameter.achievements];
                                newAchievements[index].detail = e.target.value;
                                setParameter({
                                    ...parameter,
                                    achievements: newAchievements
                                });
                            }}
                        />
                    </div>
                )
            })}
            <Button
                type="button"
                className="my-3 w-full bg-black hover:bg-gray-700 text-white dark:bg-white dark:hover:bg-gray-400 dark:text-black"
                onClick={() => setParameter({
                    ...parameter,
                    achievements: [
                        ...parameter.achievements,
                        {
                            achievement: "",
                            detail: ""
                        }
                    ]
                })}
            >
                Add achievements
            </Button>

            <Button
                className="my-3 w-full bg-black hover:bg-gray-700 text-white dark:bg-white dark:hover:bg-gray-400 dark:text-black"
                onClick={handleSubmit}
            >
                Submit for Review
            </Button>
        </div>
    )
}