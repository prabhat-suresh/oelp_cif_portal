import Request from "@/models/RequestModel"
import {NextRequest, NextResponse} from "next/server";
import { connect } from "@/dbConfig/dbConfig";
connect();

export async function POST(request: NextRequest) {
    try {
        const req_body = await request.json();
        const { date, equipmentID } = req_body;
        if (!date || !equipmentID) {
            return NextResponse.json({
                error: "Insufficient inputs provided", status: 400
                },{
                status: 400
            })
        }
        // Convert date string to Date object
        const queryDate = new Date(date);

        const sameDayRequests: Request[] = await Request.aggregate<Request>([
            {
                $addFields: {
                    startDay: { $dayOfMonth: '$startTime' },
                    startMonth: { $month: '$startTime' },
                    startYear: { $year: '$startTime' },
                    endDay: { $dayOfMonth: '$endTime' },
                    endMonth: { $month: '$endTime' },
                    endYear: { $year: '$endTime' },
                },
            },
            {
                $match: {
                    status: true,
                    equipmentID: equipmentID,
                    $expr: {
                        $and: [
                            { $eq: [{ $dayOfMonth: queryDate }, '$startDay'] },
                            { $eq: [{ $month: queryDate }, '$startMonth'] },
                            { $eq: [{ $year: queryDate }, '$startYear'] },
                            { $eq: ['$startDay', '$endDay'] },
                            { $eq: ['$startMonth', '$endMonth'] },
                            { $eq: ['$startYear', '$endYear'] },
                        ],
                    },
                }
            },
            {
                $project: {
                    _id: 1,
                    startTime: 1,
                    endTime: 1,
                }
            }
        ]);

        console.log(sameDayRequests);

        return NextResponse.json({
            "request_list": sameDayRequests, status: 200
            },{
            status: 200
        });
    } catch (error: any) {
        return NextResponse.json({
             error: error.message, status: 500
            },{
            status: 500
        });
    }
}