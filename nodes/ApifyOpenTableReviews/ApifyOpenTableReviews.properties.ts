import { IExecuteFunctions, INodeProperties } from 'n8n-workflow';

/**
 * Build the Apify Actor input from node parameters.
 * Only the real Actor inputs are sent; the Output / Fields parameters shape the
 * data we return, they are not part of the Actor input.
 */
export function buildActorInput(
	context: IExecuteFunctions,
	itemIndex: number,
	defaultInput: Record<string, any>,
): Record<string, any> {
	return {
		...defaultInput,
		restaurantId: context.getNodeParameter('restaurantId', itemIndex),
		maxResultsPerRestaurant: context.getNodeParameter('maxResultsPerRestaurant', itemIndex),
		includeRestaurantSummary: context.getNodeParameter('includeRestaurantSummary', itemIndex),
	};
}

const resourceProperties: INodeProperties[] = [
	{
		displayName: 'Resource',
		name: 'resource',
		type: 'options',
		noDataExpression: true,
		options: [
			{
				name: 'Review',
				value: 'review',
			},
		],
		default: 'review',
	},
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['review'],
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				action: 'Get restaurant reviews',
				description: 'Get reviews for a restaurant, one item per review',
			},
		],
		default: 'get',
	},
];

const actorProperties: INodeProperties[] = [
	{
		displayName: 'Restaurant ID',
		name: 'restaurantId',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'e.g. r/central-park-boathouse-new-york-2',
		description: 'The OpenTable restaurant ID or slug to fetch reviews for',
		displayOptions: { show: { resource: ['review'], operation: ['get'] } },
	},
	{
		displayName: 'Maximum Reviews per Restaurant',
		name: 'maxResultsPerRestaurant',
		type: 'number',
		default: 30,
		typeOptions: { minValue: 1 },
		description: 'How many reviews to return',
		displayOptions: { show: { resource: ['review'], operation: ['get'] } },
	},
	{
		displayName: 'Include Restaurant Summary',
		name: 'includeRestaurantSummary',
		type: 'boolean',
		default: false,
		description: 'Whether to include a restaurant summary record alongside the reviews',
		displayOptions: { show: { resource: ['review'], operation: ['get'] } },
	},
];

const outputProperties: INodeProperties[] = [
	{
		displayName: 'Output',
		name: 'output',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['review'], operation: ['get'] } },
		options: [
			{
				name: 'Raw',
				value: 'raw',
				description: 'Return every field the API produces for each review',
			},
			{
				name: 'Selected Fields',
				value: 'selected',
				description: 'Choose exactly which fields to return',
			},
			{
				name: 'Simplified',
				value: 'simplified',
				description: 'Return a compact set of the most useful review fields',
			},
		],
		default: 'simplified',
		description: 'How much data to return for each review',
	},
	{
		displayName: 'Fields to Include',
		name: 'fields',
		type: 'multiOptions',
		displayOptions: {
			show: { resource: ['review'], operation: ['get'], output: ['selected'] },
		},
		options: [
			{ name: 'Content', value: 'content' },
			{ name: 'Dined At', value: 'dined_at' },
			{ name: 'Fetched At', value: 'fetched_at' },
			{ name: 'Position', value: 'position' },
			{ name: 'Rating', value: 'rating' },
			{ name: 'Restaurant ID', value: 'restaurant_id' },
			{ name: 'Result Type', value: 'result_type' },
			{ name: 'Review ID', value: 'review_id' },
			{ name: 'Submitted At', value: 'submitted_at' },
			{ name: 'User', value: 'user' },
		],
		default: ['review_id', 'content', 'rating', 'submitted_at'],
		description: 'Which fields to return when Output is set to Selected Fields',
	},
];

const authenticationProperties: INodeProperties[] = [
	{
		displayName: 'Authentication',
		name: 'authentication',
		type: 'options',
		options: [
			{
				name: 'API Key',
				value: 'apifyApi',
			},
			{
				name: 'OAuth2',
				value: 'apifyOAuth2Api',
			},
		],
		default: 'apifyApi',
		description: 'Choose which authentication method to use',
	},
];

export const properties: INodeProperties[] = [
	...resourceProperties,
	...actorProperties,
	...outputProperties,
	...authenticationProperties,
];
