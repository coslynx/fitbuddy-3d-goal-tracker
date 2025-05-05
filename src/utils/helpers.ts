/**
 * @file src/utils/helpers.ts
 * @description This module provides utility functions for the FitnessTracker3D application.
 */

/**
 * Retrieves an environment variable by its key.
 * If the variable is not found, it returns the `defaultValue` or throws an error if no default is provided.
 *
 * @param key The key of the environment variable to retrieve.
 * @param defaultValue Optional default value to return if the variable is not found.
 * @returns The value of the environment variable.
 * @throws {Error} If the variable is not found and no default value is provided.
 */
export function getEnvironmentVariable(key: string, defaultValue?: string): string {
	try {
		const value = import.meta.env[key] || process.env[key] || defaultValue

		if (value === undefined) {
			throw new Error(`Missing environment variable: ${key}`)
		}

		return String(value)
	} catch (error: any) {
		console.error(`Error retrieving environment variable ${key}:`, error.message)
		console.error('Stack trace:', error.stack)
		throw error
	}
}

/**
 * Formats the application name for display, capitalizing the first letter of each word.
 *
 * @param appName The application name to format.
 * @returns The formatted application name.
 * @throws {Error} If the appName is not a string.
 */
export function formatAppName(appName: string): string {
	try {
		if (typeof appName !== 'string') {
			throw new Error(`Invalid input: appName must be a string, but received ${typeof appName}`)
		}

		const words = appName.split(/\s+/)
		const capitalizedWords = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		return `<span class="text-2xl font-montserrat text-primary">${capitalizedWords.join(' ')}</span>`
	} catch (error: any) {
		console.error(`Error formatting app name:`, error.message)
		console.error('Stack trace:', error.stack)
		throw error
	}
}

/**
 * Calculates the morph target influence for the 3D hero model based on the scroll percentage.
 * The influence should range from 0 to 1, corresponding to the scroll range 0 to 100%.
 *
 * @param scrollPercentage The scroll percentage (0-100).
 * @returns The morph target influence (0-1).
 */
export function calculateHeroMorphTargetInfluence(scrollPercentage: number): number {
	try {
		if (typeof scrollPercentage !== 'number') {
			throw new Error(
				`Invalid input: scrollPercentage must be a number, but received ${typeof scrollPercentage}`
			)
		}

		if (scrollPercentage < 0) {
			return 0
		}

		if (scrollPercentage > 1) {
			return 1
		}

		return scrollPercentage
	} catch (error: any) {
		console.error(`Error calculating morph target influence:`, error.message)
		console.error('Stack trace:', error.stack)
		throw error
	}
}

/**
 * Clamps a number between a minimum and maximum value.
 *
 * @param value The value to clamp.
 * @param min The minimum value.
 * @param max The maximum value.
 * @returns The clamped value.
 * @throws {Error} If min is greater than max.
 */
export function clamp(value: number, min: number, max: number): number {
	try {
		if (min > max) {
			throw new Error(`Invalid input: min (${min}) cannot be greater than max (${max})`)
		}
		return Math.max(min, Math.min(value, max))
	} catch (error: any) {
		console.error(`Error clamping value:`, error.message)
		console.error('Stack trace:', error.stack)
		throw error
	}
}