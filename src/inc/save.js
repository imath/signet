/**
 * WP dependencies.
 */
import { useBlockProps } from '@wordpress/block-editor';
import { ExternalLink } from '@wordpress/components';
import { __unstableStripHTML as stripHTML } from '@wordpress/dom';
import { __ } from '@wordpress/i18n';

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
	const titleOutput = (
		<ExternalLink
			href={ url }
			className="signet-url"
		>
			<span className="signet-title">
				{ title ? stripHTML( title ) : __( 'Open link', 'signet' ) }
			</span>
		</ExternalLink>
	);

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
						{ titleOutput }
						<p className="signet-description">{ stripHTML( description ) }</p>
					</div>
				</div>
			) }

			{ ! image && (
				<div className="signet-figure">
					{ titleOutput }
					<p className="signet-description">{ stripHTML( description ) }</p>
				</div>
			) }
		</div>
	);
}

export default SaveSignet;
