import { test, expect } from '@fixtures/booker.fixture';
import { buildBooking } from '@testdata/booking.data';
import createBookingResponseSchema from '@testdata/schemas/createBookingResponse.schema.json';
import { SchemaValidator } from '@utils/SchemaValidator';

test.describe('@P0 @api AJV JSON Schema — validate create-booking responses', () => {
    test('POST /booking response conforms to the create-booking schema', async ({ bookingApi }, testInfo) => {
        const payload = buildBooking({
            firstname: 'Schema',
            lastname: 'Valid',
            totalprice: 515,
            depositpaid: true,
            additionalneeds: 'Breakfast',
        });

        const body = await bookingApi.createBooking(payload);

        expect(SchemaValidator.validate(createBookingResponseSchema, body).errors).toEqual([]);
        await testInfo.attach('create-booking-response', {
            body: JSON.stringify(body, null, 2),
            contentType: 'application/json',
        });
    });
});