/**
 * WP dependencies.
 */
import { useBlockProps } from '@wordpress/block-editor';
import { __unstableStripHTML as stripHTML } from '@wordpress/dom';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies.
 */
import OpenInNewWindow from './external-link';

/**
 * Generates the block content to be saved.
 *
 * @since 1.0.0
 *
 * @param {Object}   props               Properties passed to the function.
 * @param {Object}   props.attributes    Available block attributes.
 * @returns {string} HTML output to save for the block.
 */
const SaveSignet = ( { attributes } ) => {
	const blockProps = useBlockProps.save();
	const { url, image, title, description } = attributes;

	if ( ! url ) {
		return null;
	}

	return (
		<div { ...blockProps }>
			{ !! image && (
				<div className="wp-block-media-text is-stacked-on-mobile">
					<figure className="wp-block-media-text__media signet-figure">
						<a href={ url } target="_blank" rel="noreferrer noopener">
							<img src={ image } alt="" />
						</a>
					</figure>
					<div className="wp-block-media-text__content">
						<OpenInNewWindow
							title={ title }
							url={ url }
						/>
						<p className="signet-description">{ stripHTML( description ) }</p>
					</div>
				</div>
			) }

			{ ! image && (
				<div className="signet-figure">
					<OpenInNewWindow
						title={ title }
						url={ url }
					/>
					<p className="signet-description">{ stripHTML( description ) }</p>
				</div>
			) }
		</div>
	);
}

export default SaveSignet;
