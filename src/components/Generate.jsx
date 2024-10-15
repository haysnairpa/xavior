import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { ScrollArea } from "./ui/scroll-area";
import { promptParser } from "@/lib/inputParser";
import { generateEssay } from "@/lib/GenerateEssay";

export const Generate = () => {
  const [essayType, setEssayType] = useState(null);
  const [formData, setFormData] = useState({});
  const [generatedEssay, setGeneratedEssay] = useState("");

  const handleEssayTypeSelect = (type) => {
    setEssayType(type);
    setFormData({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleArrayInputChange = (index, field, subfield, value) => {
    setFormData(prevData => {
      const newArray = [...(prevData[field] || [])];
      newArray[index] = { ...newArray[index], [subfield]: value };
      return { ...prevData, [field]: newArray };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting:", essayType, formData);
    console.log("Essay Type:", essayType, typeof essayType);
    try {
      const prompt = promptParser(formData, essayType);
      const result = await generateEssay(prompt)
      setGeneratedEssay(result);
  
    } catch (error) {
      console.error(error)
    }
  };

  const renderForm = () => {
    switch (essayType) {
      case "Study Plan":
        return (
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="degree">Degree</Label>
                <Input id="degree" name="degree" onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="institution">Institution</Label>
                <Input id="institution" name="institution" onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="motivation">Motivation</Label>
                <Textarea id="motivation" name="motivation" onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="background">Background</Label>
                <Textarea id="background" name="background" onChange={handleInputChange} required />
              </div>
              {['courses', 'plans'].map((field, fieldIndex) => (
                <div key={field}>
                  <Label>{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
                  {[0, 1].map((index) => (
                    <div key={`${field}-${index}`} className="mt-2">
                      <Input
                        placeholder={`${field} ${index + 1}`}
                        onChange={(e) => handleArrayInputChange(index, field, field, e.target.value)}
                        className="mb-2"
                      />
                      <Textarea
                        placeholder={`Reason for ${field} ${index + 1}`}
                        onChange={(e) => handleArrayInputChange(index, field, 'reason', e.target.value)}
                      />
                    </div>
                  ))}
                </div>
              ))}
              <Button type="submit">Generate Study Plan</Button>
            </div>
          </form>
        );
      case "Motivation Letter":
        return (
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="degree">Degree</Label>
                <Input id="degree" name="degree" onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="institution">Institution</Label>
                <Input id="institution" name="institution" onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="background">Background</Label>
                <Textarea id="background" name="background" onChange={handleInputChange} required />
              </div>
              <div>
                <Label>Motivations</Label>
                {[0, 1].map((index) => (
                  <div key={`motivation-${index}`} className="mt-2">
                    <Input
                      placeholder={`Motivation ${index + 1}`}
                      onChange={(e) => handleArrayInputChange(index, 'motivations', 'motivation', e.target.value)}
                      className="mb-2"
                    />
                    <Textarea
                      placeholder={`Contribution plan related to motivation ${index + 1}`}
                      onChange={(e) => handleArrayInputChange(index, 'motivations', 'plan', e.target.value)}
                    />
                  </div>
                ))}
              </div>
              <div>
                <Label htmlFor="advantages">Advantages</Label>
                <Textarea id="advantages" name="advantages" onChange={handleInputChange} required />
              </div>
              <Button type="submit">Generate Motivation Letter</Button>
            </div>
          </form>
        );
      case "Personal Statement":
        return (
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="degree">Degree</Label>
                <Input id="degree" name="degree" onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="institution">Institution</Label>
                <Input id="institution" name="institution" onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="background">Background</Label>
                <Textarea id="background" name="background" onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="advantages">Advantages</Label>
                <Textarea id="advantages" name="advantages" onChange={handleInputChange} required />
              </div>
              {['experiences', 'achievements'].map((field, fieldIndex) => (
                <div key={field}>
                  <Label>{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
                  {[0, 1].map((index) => (
                    <div key={`${field}-${index}`} className="mt-2">
                      <Input
                        placeholder={`${field.slice(0, -1)} ${index + 1}`}
                        onChange={(e) => handleArrayInputChange(index, field, field.slice(0, -1), e.target.value)}
                        className="mb-2"
                      />
                      <Textarea
                        placeholder={`Detail for ${field.slice(0, -1)} ${index + 1}`}
                        onChange={(e) => handleArrayInputChange(index, field, 'detail', e.target.value)}
                      />
                    </div>
                  ))}
                </div>
              ))}
              <Button type="submit">Generate Personal Statement</Button>
            </div>
          </form>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 overflow-auto p-4 lg:p-8 bg-white dark:bg-transparent text-gray-900 dark:text-white">
      <h1 className="text-2xl lg:text-4xl font-bold mb-4 lg:mb-8 text-gray-900 dark:text-white">
        Generate Essay with Xavior
      </h1>
      <p className="mb-4 text-gray-600 dark:text-gray-400">
        Choose the type of essay you want to generate. Our AI will help you create a well-structured essay based on your inputs.
      </p>
      <div className="grid gap-4 lg:gap-8 grid-cols-1 lg:grid-cols-2">
        <div className="space-y-4">
          <Card className="w-full bg-gray-100 dark:bg-slate-950">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">Choose Essay Type</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Select the type of essay you want to generate
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {["Study Plan", "Motivation Letter", "Personal Statement"].map((type) => (
                  <Button 
                    key={type}
                    type="button"
                    className="w-full "
                    onClick={() => handleEssayTypeSelect(type)}
                  >{type}</Button>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {essayType && (
            <Card className="w-full bg-gray-100 dark:bg-slate-950">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">{essayType} Form</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Fill in the details for your {essayType}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[60vh]">
                  {renderForm()}
                </ScrollArea>
              </CardContent>
            </Card>
          )}
        </div>
        
        <Card className="w-full bg-gray-100 dark:bg-slate-950">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">Generated Essay</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Your AI-generated essay will appear here
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="">
              <div className="whitespace-pre-wrap">
                {generatedEssay || "Your generated essay will appear here after submission."}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
