import { useState, useEffect, useRef } from "react"
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { useTheme } from "next-themes"
import { StudyPlanForm } from "./form/studyPlanForm"
import { MotivationalLetterForm } from "./form/motivationLetterForm"
import { PersonalStatementForm } from "./form/personalStatementForm"

export const Generate = () => {
  const { theme } = useTheme()
  const [essay, setEssay] = useState("Motivational Letter")
  const [result, setResult] = useState(null)
  const [studyPlan, setStudyPlan] = useState({
    studyProgram: "",
    institution: "",
    motivation: "",
    background: "",
    courses: [
      {
        course: "",
        reason: ""
      }
    ],
    plans: [
      {
        plan: "",
        reason: ""
      }
    ]
  })
  const [motivationLetter, setMotivationLetter] = useState({
    studyProgram: "",
    institution: "",
    background: "",
    motivations: [
      {
        motivation: "",
        plan: "",
      }
    ],
    advantages: "",
    
  })
  const [personalStatement, setPersonalStatement] = useState({
    studyProgram: "",
    institution: "",
    background: "",
    advantages: "",
    experiences: [
      {
        experience: "",
        detail: ""
      }
    ],
    achievements: [
      {
        achievement: "",
        detail: ""
      }
    ],
  })

  const uploadCardRef = useRef(null)
  const resultCardRef = useRef(null)

  const handleSubmit = (e, form) => {
    if (e) e.preventDefault()
    // Simulasi hasil review AI
    console.log(form);
    // Here you would typically send the studyPlan to your backend or AI service
    // For now, let's just set some dummy review results
  }

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      if (uploadCardRef.current && resultCardRef.current) {
        const uploadHeight = uploadCardRef.current.offsetHeight
        resultCardRef.current.style.height = `${uploadHeight}px`
      }
    })

    if (uploadCardRef.current) {
      resizeObserver.observe(uploadCardRef.current)
    }

    return () => resizeObserver.disconnect()
  }, [])

  return (
    <div className="flex-1 overflow-auto p-4 lg:p-8 bg-white dark:bg-transparent text-gray-900 dark:text-white">
      <h1 className="text-2xl lg:text-4xl font-bold mb-4 lg:mb-8 text-gray-900 dark:text-white">
        Generate Essay with Xavior
      </h1>
      <div className="grid gap-4 lg:gap-8 grid-cols-1 lg:grid-cols-2">
        <Card className="w-full bg-gray-100 dark:bg-slate-950" ref={uploadCardRef}>
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">Generate Essay</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Submit your essay for AI-powered review
            </CardDescription>
            <Button 
              type="button"
              variant="outline" 
              className="w-full hover:text-black dark:bg-white dark:hover:bg-gray-400 dark:text-black"
              onClick={() => setEssay("Motivational Letter")}
              >Motivation Letter</Button>
            <Button 
              type="button"
              variant="outline" 
              className="w-full hover:text-black dark:bg-white dark:hover:bg-gray-400 dark:text-black"
              onClick={() => setEssay("Personal Statement")}
              >Personal Statement</Button>
            <Button 
              type="button"
              variant="outline" 
              className="w-full hover:text-black dark:bg-white dark:hover:bg-gray-400 dark:text-black"
              onClick={() => setEssay("Study Plan")}
              >Study Plan</Button>
          </CardHeader>
          <CardContent>
            {essay === "Motivational Letter" ? (
              <div>
                <h4 className="text-xl lg:text-md font-bold mb-4 lg:mb-8 text-gray-900 dark:text-white">
                  Motivational Letter Essay
                </h4>
                <MotivationalLetterForm
                  handleSubmit={() => handleSubmit(form = motivationLetter)}
                  parameter={motivationLetter}
                  setParameter={setMotivationLetter}
                />
              </div>
            ) : essay === "Study Plan" ? (
              <div>
                <h4 className="text-xl lg:text-md font-bold mb-4 lg:mb-8 text-gray-900 dark:text-white">
                  Study Plan Essay
                </h4>
                <StudyPlanForm
                  handleSubmit={() => handleSubmit(form = studyPlan)}
                  parameter={studyPlan}
                  setParameter={setStudyPlan}
                />
              </div>
            ) : (
              <div>
                <h4 className="text-xl lg:text-md font-bold mb-4 lg:mb-8 text-gray-900 dark:text-white">
                  Personal Statement Essay
                </h4>
                <PersonalStatementForm
                  handleSubmit={() => handleSubmit(form = personalStatement)}
                  parameter={personalStatement}
                  setParameter={setPersonalStatement}
                />
              </div>
            )}
          </CardContent>
        </Card>
        <Card className={`w-full flex flex-col dark:bg-[#1b1b23] ${result ? '' : 'justify-center items-center text-center'}`} ref={resultCardRef}>
          <CardHeader>
            <CardTitle>AI Review Results</CardTitle>
            <CardDescription>Get instant feedback on your essay</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Submit your essay to see AI-generated review results here.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}