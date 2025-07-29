/**
 * WP dependencies.
 */
import { useBlockProps } from '@wordpress/block-editor';
import { ExternalLink } from '@wordpress/components';
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
				{ title ? title : __( 'Open link', 'signet' ) }
			</span>
		</ExternalLink>
	);

	if ( ! url ) {
		return null;
	}

	return (
		<div { ...blockProps }>
			{ !! image && (
				<figure className="signet-figure">
					<a href={ url } target="_blank" rel="noreferrer noopener">
						<img src={ image } alt="" />
					</a>
					<figcaption>
						{ titleOutput }
						<p className="signet-description">{ description }</p>
					</figcaption>
				</figure>
			) }

			{ ! image && (
				<div className="signet-figure">
					{ titleOutput }
					<p className="signet-description">{ description }</p>
				</div>
			) }
		</div>
	);
}

export default SaveSignet;
