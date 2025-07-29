/**
 * WP dependencies.
 */
import { __experimentalFetchUrlData as fetchUrlData } from '@wordpress/core-data';
import { useEffect, useReducer } from '@wordpress/element';

/**
 * Resolves URL Rich Data.
 *
 * @since 1.0.0
 *
 * @param {object} state
 * @param {object} action
 * @returns {object}
 */
const reducer = ( state, action ) => {
	switch ( action.type ) {
		case 'RESOLVED':
			return {
				...state,
				isFetching: false,
				richData: action.richData,
			};
		case 'ERROR':
			return {
				...state,
				isFetching: false,
				richData: null,
			};
		case 'LOADING':
			return {
				...state,
				isFetching: true,
			};
		default:
			throw new Error( `Unexpected action type ${ action.type }` );
	}
}

/**
 * Gets URL Rich Data.
 *
 * @since 1.0.0
 *
 * @param {string} url The URL to request rich date for.
 * @returns {object}
 */
const useRichUrlData = ( url ) => {
	const [ state, dispatch ] = useReducer( reducer, {
		richData: null,
		isFetching: false,
	} );

	useEffect( () => {
		if ( url && url.length ) {
			dispatch( {
				type: 'LOADING',
			} );

			const controller = new window.AbortController();

			const signal = controller.signal;

			fetchUrlData( url, {
				signal,
			} ).then( ( urlData ) => {
				dispatch( {
					type: 'RESOLVED',
					richData: urlData,
				} );
			} ).catch( () => {
				if ( ! signal.aborted ) {
					dispatch( {
						type: 'ERROR',
					} );
				}
			} );

			return () => {
				controller.abort();
			};
		}
	}, [ url ] );

	return state;
}

export default useRichUrlData;
