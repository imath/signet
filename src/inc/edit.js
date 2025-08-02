/**
 * WP dependencies.
 */
import {
	BlockControls,
	useBlockProps,
} from '@wordpress/block-editor';
import {
	Placeholder,
	Button,
	ExternalLink,
	Spinner,
	ToolbarGroup,
	ToolbarButton,
} from '@wordpress/components';
import { __experimentalFetchUrlData as fetchUrlData } from '@wordpress/core-data';
import { __unstableStripHTML as stripHTML } from '@wordpress/dom';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies.
 */
import { ReactComponent as IconSignet } from '../assets/icon.svg';

/**
 * Generates the edit part of the block.
 *
 * @since 1.0.0
 *
 * @param {Object}   props               Properties passed to the function.
 * @param {Object}   props.attributes    Available block attributes.
 * @param {Function} props.setAttributes Function that updates individual attributes.
 * @returns {string} HTML output for editing the block.
 */
const EditSignet = ( { attributes, setAttributes } ) => {
	const blockProps = useBlockProps();
	const label = __( 'Signet', 'signet' );
	const { url, image, title, description } = attributes;
	const [ link, setURL ] = useState( url );
	const [ isEditingURL, setIsEditingURL ] = useState( ! url || ! title );
	const [ isFetching, setIsFetching ] = useState( false );

	const onSubmit = ( event ) => {
		if ( event ) {
			event.preventDefault();
		}

		setIsEditingURL( false );
		setIsFetching( true );
		setAttributes( { url: link } );

		fetchUrlData( link ).then( ( urlData ) => {
			setAttributes( urlData );
		} ).then( () => setIsFetching( false ) );
	};

	const switchBackToURLInput = ( event ) => {
		if ( event ) {
			event.preventDefault();
		}

		setIsEditingURL( true );
		setURL( '' );
		setAttributes(
			{
				'url': '',
				'title': '',
				'description': '',
				'image': '',
				'icon': '',
			}
		);
	};

	if ( isEditingURL ) {
		return (
			<div { ...blockProps }>
				<Placeholder
					icon={ <IconSignet width="24px" /> }
					label={ label }
					className="wp-block-embed"
					instructions={ __( 'Paste the link URL & hit the Embed button to fetch preview informations.', 'signet' ) }
				>
					<form onSubmit={ onSubmit }>
						<input
							type="url"
							value={ link || '' }
							className="components-placeholder__input"
							aria-label={ label }
							placeholder={ __( 'Insert link URL to preview…', 'signet' ) }
							onChange={ ( event ) => setURL( event.target.value ) }
						/>
						<Button variant="primary" type="submit">
							{ __( 'Embed', 'signet' ) }
						</Button>
					</form>
				</Placeholder>
			</div>
		);
	}

	if ( !! url && ! title ) {
		if ( isFetching ) {
			return (
				<div { ...blockProps }>
					<div className="wp-block-embed is-loading">
						<Spinner />
					</div>
				</div>
			);
		}
	}

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

	const editToolbar = (
		<BlockControls>
			<ToolbarGroup>
				<ToolbarButton
					icon="edit"
					title={ __(
						'Edit Link URL',
						'signet'
					) }
					onClick={ switchBackToURLInput }
				/>
			</ToolbarGroup>
		</BlockControls>
	);

	return (
		<div { ...blockProps }>
			{ editToolbar }

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

export default EditSignet;
