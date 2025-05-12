import { useState } from 'react'
import {
  PasswordValidator,
  defaultRules,
  RuleSet,
  FunctionRule,
  type ValidationResult,
} from '@costilladante/password-validator'
import { Button } from './components/ui/button'
import { Card } from './components/ui/card'
import { Input } from './components/ui/input'
import { Progress } from './components/ui/progress'
import { Avatar, AvatarFallback, AvatarImage } from './components/ui/avatar'
import { Label } from './components/ui/label'
import { toast, Toaster } from 'sonner'

import '@costilladante/password-validator/style.css'
import './App.css'

function App() {
  const [progress, setProgress] = useState(0)
  const [isValid, setIsValid] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    toast(isValid ? 'Password is valid!' : 'Please fix the password requirements')
  }

  const customRule = new FunctionRule(
    'customRule',
    'Password must be longer than 10 characters',
    (password: string) => password.length > 10,
  )

  const customRuleSet: RuleSet = new RuleSet([...defaultRules.rules, customRule])

  const onValidationChange = (isValid: boolean, errors: ValidationResult[]) => {
    setIsValid(isValid)
    const validRules = errors.filter((error) => error.isValid).length
    const totalRules = errors.length
    const progressPercentage = (validRules / totalRules) * 100
    setProgress(progressPercentage)
  }

  const onValueChange = (value: string) => {
    console.log('value', value)
  }
  return (
    <div className="min-h-screen w-full animated-gradient flex items-center justify-center p-4 sm:p-6 md:p-8">
      <Toaster />
      <Card className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-lg">
        <div className="space-y-4 flex flex-col items-center">
          <div aria-label="User Avatar">
            <div className="inline-flex items-center justify-center w-22 h-22 rounded-full animated-gradient text-white ">
              <Avatar className="w-20 h-20">
                <AvatarImage src="https://avatars.githubusercontent.com/u/31970491?v=4" />
                <AvatarFallback>DC</AvatarFallback>
              </Avatar>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-center text-gray-800">Welcome</h1>
          <p className="text-center text-gray-500">Create a secure password to get started</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-2 space-y-6">
          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Progress value={progress} />
              <PasswordValidator
                ruleSet={customRuleSet}
                onValidationChange={onValidationChange}
                onValueChange={onValueChange}
              />
            </div>
          </div>

          <div className="space-y-1">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <div className="relative">
              <Input id="confirm-password" />
            </div>
          </div>

          <Button type="submit" className="w-full">
            Create account
          </Button>
        </form>
      </Card>
    </div>
  )
}

export default App
