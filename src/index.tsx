import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/index.css'

try {
	const rootElement = document.getElementById('root')
	if (!rootElement) {
		throw new Error('Failed to find the root element in the document')
	}

	const root = ReactDOM.createRoot(rootElement)

	root.render(
		<React.StrictMode>
			<App />
		</React.StrictMode>
	)
} catch (error: any) {
	console.error('Failed to render the application:', error.message)
	const appElement = document.getElementById('root')
	if (appElement) {
		appElement.innerHTML = `<div style="color: red; text-align: center; padding: 20px;">
        		Failed to load the application. Please try again later.
    		</div>`
	}
}