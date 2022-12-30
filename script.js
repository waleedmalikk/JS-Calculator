class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement){
      this.previousOperandTextElement = previousOperandTextElement
      this.currentOperandTextElement = currentOperandTextElement
      this.clear()
    }

    reverse(s){
      return s.split("").reverse().join("")
    }

    getStrLastElement(s){
      return s.toString()[s.length-1]
    }

    checkStrIncludes(s,arr){
      if(s===undefined){
        return false
      }else{
        return arr.some(element=>s.toString().includes(element))
      }
    }

    strIndexesContainArr(s,arr){
      let inds=[]
      if(s!==undefined){
        for (let i = 0; i < s.toString().length; i++){
          if(arr.some(element=>s.toString()[i].includes(element))){
            inds.push(i)
            }
          }
        }
      return inds
    }
    
    insertBeforeAfter(s){
      let indices=[]
      for(let i=0;i<s.length;i++){
          if(s[i]=='.'){
              indices.push(i)
          }
      }
      for (let i=0; i<indices.length;i++){
          if(this.checkStrIncludes(s[indices[i]-1],numbers_string) && this.checkStrIncludes(s[indices[i]+1],numbers_string)){
          }else{
              s = s.split('')
              s[indices[i]] = '0'
              s = s.join('')
          }
      }
      return s.toString()
  }
  
    append(addition) {
      let lastCharacter= this.getStrLastElement(this.currentOperand)
      if(!this.checkStrIncludes(addition,operations_string) && lastCharacter ===')' ){
        this.currentOperand = this.currentOperand.toString() + '*' + addition.toString()
      }else if(lastCharacter ==='.'  && addition.toString() ==='.' ){
        return
      }else if(this.checkStrIncludes(lastCharacter,operations_string) && this.checkStrIncludes(addition,operations_string)){
        this.currentOperand =  this.currentOperand.toString().slice(0,-1)+ addition.toString()
      }else{
        this.currentOperand = this.currentOperand.toString() + addition.toString()
      }  
    }
    
    clear() {
      this.currentOperand = ''
      this.previousOperand = ''
      this.operation = undefined
    }
  
    delete() {
      this.currentOperand=this.currentOperand.toString().slice(0,-1)
    }  

    answer(){
      let lastCharacter= this.getStrLastElement(this.currentOperand)
      if(this.checkStrIncludes(lastCharacter,operations_string) ){
        this.currentOperand=this.currentOperand.toString().slice(0,-1)
      }
      let current_query=this.currentOperand.toString()
      current_query=this.insertBeforeAfter(current_query)
      this.previousOperand= eval(current_query.replaceAll('÷','/'))
    }

    sign(){
      let lastCharacter= this.getStrLastElement(this.currentOperand)

      if(this.checkStrIncludes(lastCharacter,operations_string) ){
        return
      }else if(lastCharacter===')'){
        let inds=this.strIndexesContainArr(this.currentOperand,operations_string)

          this.currentOperand= this.currentOperand.toString().substring(0,inds[inds.length-1]-1)+ this.currentOperand.toString().substring(inds[inds.length-1]+1, this.currentOperand.toString().length-1)

      }else{
        let insert_ind=0
        let indices=this.strIndexesContainArr(this.currentOperand,operations_string)
          if (indices.length!==0){
            insert_ind=indices[indices.length-1]+1
          }
          this.currentOperand = this.currentOperand.toString().substring(0,insert_ind)+"(-"+ this.currentOperand.toString().substring(insert_ind)+")"
        }
      }

    updateDisplay() {
      this.currentOperandTextElement.innerText = this.currentOperand
      this.previousOperandTextElement.innerText= this.previousOperand
    }

  }
  
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const percentButton = document.querySelector('[percent-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const signButton = document.querySelector('[sign]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')
const operations_string= ['+','-','*','÷']
const numbers_string=['0','1','2','3','4','5','6','7','8','9','.']

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.append(button.innerText)
    calculator.updateDisplay()
  })
})

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.append(button.innerText)
    calculator.updateDisplay()
  })
})

equalsButton.addEventListener('click', ()  =>{
  calculator.answer()
  calculator.updateDisplay()
})

allClearButton.addEventListener('click', ()  =>{
  calculator.clear()
  calculator.updateDisplay()
})

deleteButton.addEventListener('click', ()  =>{
  calculator.delete()
  calculator.updateDisplay()
})

signButton.addEventListener('click', () =>{
  calculator.sign()
  calculator.updateDisplay()
})