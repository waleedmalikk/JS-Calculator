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
          if(!this.checkStrIncludes(s[indices[i]-1],numbers_string) && !this.checkStrIncludes(s[indices[i]+1],numbers_string)){
            s = s.split('')
              s[indices[i]] = '0'
              s = s.join('')
          }
      }
      return s.toString()
  }

  clear() {
    this.currentOperand = ''
    this.previousOperand = ''
    this.operation = undefined
  }

  delete() {
    this.currentOperand=this.currentOperand.toString().slice(0,-1)
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

    braketRemoval(s){
      let arr=[]
      for (let i= 0;i<s.length;i++){
        if(s[i]==='('){
          arr.push(i)
        }else if(s[i]===')'){
          arr.splice(arr.length-1,1)
        }
      }

      for (let i = 0; i < arr.length; i++) {
        s= s.slice(0,arr[i]) + s.slice(arr[i]+1)
      }
      return s

    }

    answer(){
      let current_query=this.currentOperand.toString()
      current_query=this.insertBeforeAfter(current_query)
      let lastCharacter= this.getStrLastElement(current_query)
      if(this.checkStrIncludes(lastCharacter,operations_string) ){
        current_query=current_query.slice(0,-1)
      }
      current_query=current_query.replaceAll('÷','/')

      for(let i=0;i<current_query.length;i++){
        if(current_query[i]=="%"){
          if(i!=current_query.length-1 && !this.checkStrIncludes(current_query[i+1],operations_string)){
            current_query= current_query.slice(0,i)+'/100*'+current_query.slice(i+1)
          }else{
            current_query= current_query.slice(0,i)+'/100'+current_query.slice(i+1)
          }
        }
      }
      current_query=this.braketRemoval(current_query)
        if(current_query.length==1 && this.checkStrIncludes(current_query,operations_string)){
          current_query=""
         }
        console.log("current_query:",current_query)
       try{
        let ans= eval(current_query)  
        this.previousOperand=ans    

       }catch(error){
        this.previousOperand="ERROR"
       }
    }

    sign(){
      if(this.currentOperand===''){
        return
      }
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

const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const percentButton = document.querySelector('[percent-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const signButton = document.querySelector('[sign]')
const operations_string= ['+','-','*','÷']
const numbers_string=['0','1','2','3','4','5','6','7','8','9','.']

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.append(button.innerText)
    calculator.answer()
    calculator.updateDisplay()
  })
})

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.append(button.innerText)
    calculator.answer()
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
  calculator.answer()
  calculator.updateDisplay()
})

signButton.addEventListener('click', () =>{
  calculator.sign()
  calculator.answer()
  calculator.updateDisplay()
})

percentButton.addEventListener('click', ()=>{
  calculator.append(percentButton.innerText)
  calculator.answer()
  calculator.updateDisplay()
})