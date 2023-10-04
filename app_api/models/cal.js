const goo = require('mongoose');

const timeOfDayBoundsSchema = new goo.Schema({
    Early_AM_Begin: Number, Early_AM_End: Number,
    Morning_Begin: Number, Morning_End: Number,
    Afternoon_Begin: Number, Afternoon_End: Number,
    Evening_Begin: Number, Evening_End: Number
});
const durationSchema = new goo.Schema({
    begin: { type: Date, required: true },
    end: { type: Date, required: true }
});
const activitySchema = new goo.Schema({
    activity_code: { type: String, required: true }, 
    duration: { type: durationSchema, required: true }
});
const calViewSchema = new goo.Schema({
    context: { type: String, required: true },
    times_of_day_bounds: timeOfDayBoundsSchema,
    activities: [{ type: activitySchema, required: true }]
    // activities: [activitySchema]
});

const modeSchema = new goo.Schema({ mode_name: String, mode: Number });

const measureSchema = new goo.Schema({ unit: String, measure: Number });
const nutritionSchema = new goo.Schema({ 
    name: String, measure_list: [measureSchema]
});

const labelSchema = new goo.Schema({ 
    extracted_text: { type: String, required: true } , 
    label_name: { type: String, required: true }
});
const commentSchema = new goo.Schema({
    author: { type: String, required: true }, 
    timestamp: { type: Date, required: true },
    comment_text: { type: String, required: true },
    labels: [labelSchema]
} );

const fortnightSchema = new goo.Schema({
    ordinal_number: { type: Number, required: true },
    day1_fzero: { type: Date, required: true },
    intent_cal_view: { type: calViewSchema, required: true },
    adhered_cal_view: { type: calViewSchema, required: true },
    modes: [modeSchema],
    nutrition_history: [nutritionSchema],
    comments: [commentSchema]
});

const yearSchema = new goo.Schema({
    year: { type: Number, required: true },
    fortnights: [{ type: fortnightSchema, required: true }]
});

goo.model('Year',yearSchema);