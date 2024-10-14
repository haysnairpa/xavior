import React from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"

export const StudyPlanForm = ({ handleSubmit, parameter, setParameter}) => {
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
            <label htmlFor="motivation" className="my-2">Reason why you choose the university and the study program</label>
            <Textarea
                placeholder="Your motivation here"
                id="motivation"
                className="my-2 min-h-[150px] bg-white dark:bg-transparent text-gray-900 dark:text-white"
                value={parameter.motivation}
                onChange={(e) => {
                    setParameter({
                        ...parameter,
                        motivation: e.target.value
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
            <label>Course plan to take</label>
            {parameter.courses.map((course, index) => {
                return(
                    <div key={index}>
                        <label htmlFor={`course-${index+1}`}>{index + 1}. Course</label>
                        <Input
                            id={`course-${index+1}`}
                            type="text"
                            className="mx-3 my-3 bg-white dark:bg-transparent text-gray-900 dark:text-white"
                            value={course.course}
                            onChange={(e) => {
                                const newPlans = [...parameter.courses];
                                newPlans[index].course = e.target.value;
                                setParameter({
                                    ...parameter,
                                    courses: newPlans
                                });
                            }}
                        />
                        <label htmlFor={`courseReason-${index+1}`} className="mx-3 my-3">Reason for the plan</label>
                        <Input
                            id={`courseReason-${index+1}`}
                            type="text"
                            className="mx-3 my-3 bg-white dark:bg-transparent text-gray-900 dark:text-white"
                            value={course.reason}
                            onChange={(e) => {
                                const newCourses = [...parameter.courses];
                                newCourses[index].reason = e.target.value;
                                setParameter({
                                    ...parameter,
                                    courses: newCourses
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
                    courses: [
                        ...parameter.courses,
                        {
                            course: "",
                            reason: ""
                        }
                    ]
                })}
            >
                Add courses
            </Button>

            {parameter.plans.map((plan, index) => {
                return(
                    <div key={index}>
                        <label htmlFor={`plan-${index+1}`}>{index + 1}. Plan</label>
                        <Input
                            id={`plan-${index+1}`}
                            type="text"
                            className="mx-3 my-3 bg-white dark:bg-transparent text-gray-900 dark:text-white"
                            value={plan.plan}
                            onChange={(e) => {
                                const newPlans = [...parameter.plans];
                                newPlans[index].plan = e.target.value;
                                setParameter({
                                    ...parameter,
                                    plans: newPlans
                                });
                            }}
                        />
                        <label htmlFor={`planReason-${index+1}`} className="mx-3 my-3">Reason for the plan</label>
                        <Input
                            id={`planReason-${index+1}`}
                            type="text"
                            className="mx-3 my-3 bg-white dark:bg-transparent text-gray-900 dark:text-white"
                            value={plan.reason}
                            onChange={(e) => {
                                const newPlans = [...parameter.plans];
                                newPlans[index].reason = e.target.value;
                                setParameter({
                                    ...parameter,
                                    plans: newPlans
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
                    plans: [
                        ...parameter.plans,
                        {
                            plan: "",
                            reason: ""
                        }
                    ]
                })}
            >
                Add plans
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