 enum SessionVariabels {
  Email,
  Id
}

const SessionHelper = {
  GetVerable: (Name: SessionVariabels) => {
    return sessionStorage.getItem(Name.toString())?
     sessionStorage.getItem(Name.toString()):'N/A'
  },
  SetVerable: (Name: SessionVariabels, value: string) => {
    sessionStorage.setItem(Name.toString(), value)
  },
  ClearVerable: () => {
    sessionStorage.clear()
  }
}

export { SessionVariabels, SessionHelper }
