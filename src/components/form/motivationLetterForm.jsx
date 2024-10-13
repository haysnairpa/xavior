import React from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"

export const MotivationalLetterForm = ({ handleSubmit, parameter, setParameter}) => {
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
            {parameter.motivations.map((motivation, {index}) => {
                return(
                    <div key={index}>
                        <label htmlFor={`motivation-${index+1}`}>{index + 1}. Motivation</label>
                        <Input
                            id={`motivation-${index+1}`}
                            type="text"
                            className="mx-3 my-3 bg-white dark:bg-transparent text-gray-900 dark:text-white"
                            value={motivation.motivation}
                            onChange={(e) => {
                                const newMotivations = [...parameter.motivations];
                                newMotivations[index].motivation = e.target.value;
                                setParameter({
                                    ...parameter,
                                    motivations: newMotivations
                                });
                            }}
                        />
                        <label htmlFor={`plan-${index+1}`} className="mx-3 my-3">Plan</label>
                        <Input
                            id={`plan-${index+1}`}
                            type="text"
                            className="mx-3 my-3 bg-white dark:bg-transparent text-gray-900 dark:text-white"
                            value={motivation.plan}
                            onChange={(e) => {
                                const newPlans = [...parameter.motivations];
                                newPlans[index].plan = e.target.value;
                                setParameter({
                                    ...parameter,
                                    motivations: newPlans
                                });
                            }}
                        />
                    </div>
                )
            })}
            <Textarea
                placeholder="Your advantages here"
                id="advantages"
                className="my-2 min-h-[150px] bg-white dark:bg-transparent text-gray-900 dark:text-white"
                value={parameter.advantages}
                onChange={(e) => {
                    setParameter({
                        ...parameter,
                        background: e.target.value
                    })
                }}
            />
            <Button
                type="button"
                className="my-3 w-full bg-black hover:bg-gray-700 text-white dark:bg-white dark:hover:bg-gray-400 dark:text-black"
                onClick={() => setParameter({
                    ...parameter,
                    motivations: [
                        ...parameter.motivations,
                        {
                            motivation: "",
                            plan: ""
                        }
                    ]
                })}
            >
                Add motivations
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