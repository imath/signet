/**
 * WP dependencies.
 */
import { __ } from '@wordpress/i18n';
import { __unstableStripHTML as stripHTML } from '@wordpress/dom';

/**
 * Internal dependencies.
 */
import { ReactComponent as IconExternal } from '../assets/external.svg';

const OpenInNewWindow = ( { title, url } ) => {
	if ( ! title || ! url ) {
		return null;
	}

	return (
		<a
			href={ url }
			className="components-external-link signet-url"
			target="_blank"
			rel="external noreferrer noopener"
		>
			<span className="components-external-link__contents signet-title">
				{ title ? stripHTML( title ) : __( 'Open link', 'signet' ) }
			</span>
			<span
				className="components-external-link__icon wp-exclude-emoji"
				aria-label={
					/* translators: accessibility text */
					__( '(opens in a new tab)', 'signet' )
				}
			>
				<IconExternal width="24px" />
			</span>
		</a>
	);
}

export default OpenInNewWindow;
