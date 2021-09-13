/// <reference types="cypress" />

describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/home')
  })

  it('should display the shared content for both views', () => {
      
  })

  it('should redirect me to a session when clicked', () => {

  })

  it('should show a popover with additional options when the elipsis is clicked', () => {
    
  })

  describe('Daily view', () => {
    it('should include the session description on the Card', () => {
      
    })
  })

  describe('Weekly view', () => {
    it('should show CREATE buttons for each day of the week', () => {
    
    })
  })

  describe('Filtering', () => {
    it('should allow the user to filter sessions to daily/weekly view', () => {

    })
  
    it('should allow the user to filter views with hotkeys D and W', () => {
      
    })
  })

  describe.skip('Logged In', () => {
    context('Vehikl User', () => {
      it('should allow the user the ability to create a new session', () => {
    
      })
  
      it('should show growth sessions marked as public and private', () => {
        
      })

      it('should allow the user the ability to edit the session', () => {
      
      })
  
      it('should allow the user the ability to copy the session', () => {
        
      })
  
      it('should allow the user the ability to delete the session', () => {
        
      })
    })

    it('should allow the user the ability to join a session', () => {
    
    })

    it('should allow the user the ability to schedule the session in Google', () => {
      
    })
  })

  describe('Logged Out', () => {
    it('should only show growth sessions marked as public', () => {
      
    })

    it('should the user a login button in the nav', () => {
      
    })
  });
})
