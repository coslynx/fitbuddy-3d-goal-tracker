import React from 'react'
import { Hero } from 'src/components/Hero'
import { Features } from 'src/components/Features'
import { CTA } from 'src/components/CTA'
import './styles/index.css'

function App() {
	try {
		const appName = import.meta.env.VITE_APP_NAME || 'FitnessTracker3D'

		return (
			<React.Fragment>
				<div className="container mx-auto py-8 px-4 mobile:px-2 tablet:px-4 desktop:px-8">
					<Hero appName={appName} />
					<Features />
					<CTA />
				</div>
			</React.Fragment>
		)
	} catch (error: any) {
		console.error('Failed to render the application:', error.message)
		const appElement = document.getElementById('root')
		if (appElement) {
			appElement.innerHTML = `<div style="color: red; text-align: center; padding: 20px;">
        	Failed to load the application. Please try again later.
    		</div>`
		}
		return null
	}
}

export default App