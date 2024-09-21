import { useState, useEffect, useRef } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { useTheme } from "next-themes"

export const Review = () => {
  const { theme } = useTheme()
  const [reviewResults, setReviewResults] = useState(null)
  const uploadCardRef = useRef(null)
  const resultCardRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simulasi hasil review AI
    setReviewResults({
      grammarScore: 95,
      structureScore: 90,
      contentScore: 88
    })
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
        Welcome to Xavior, the AI Essay Reviewer
      </h1>
      <div className="grid gap-4 lg:gap-8 grid-cols-1 lg:grid-cols-2">
        <Card className="w-full bg-gray-100 dark:bg-slate-950" ref={uploadCardRef}>
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">Upload Your Essay</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Submit your essay for AI-powered review
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                id="essay-upload"
                type="file"
                className="bg-white dark:bg-transparent text-gray-900 dark:text-white"
              />
              <Textarea
                placeholder="Or paste your essay here..."
                className="min-h-[150px] bg-white dark:bg-transparent text-gray-900 dark:text-white"
              />
              <Button
                type="submit"
                className="w-full bg-black hover:bg-gray-700 text-white dark:bg-white dark:hover:bg-gray-400 dark:text-black"
              >
                Submit for Review
              </Button>
            </form>
          </CardContent>
        </Card>
        <Card className={`w-full flex flex-col dark:bg-[#1b1b23] ${reviewResults ? '' : 'justify-center items-center text-center'}`} ref={resultCardRef}>
          <CardHeader>
            <CardTitle>AI Review Results</CardTitle>
            <CardDescription>Get instant feedback on your essay</CardDescription>
          </CardHeader>
          <CardContent>
            {reviewResults ? (
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">Grammar Score:</h3>
                  <p>{reviewResults.grammarScore}/100</p>
                </div>
                <div>
                  <h3 className="font-semibold">Structure Score:</h3>
                  <p>{reviewResults.structureScore}/100</p>
                </div>
                <div>
                  <h3 className="font-semibold">Content Score:</h3>
                  <p>{reviewResults.contentScore}/100</p>
                </div>
                <Button variant="outline" className="w-full hover:text-black dark:bg-white dark:hover:bg-gray-400 dark:text-black">View Detailed Report</Button>
              </div>
            ) : (
              <p>Submit your essay to see AI-generated review results here.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}