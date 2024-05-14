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
                status: 400,
                error: "Insufficient inputs provided"
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
            status: 200,
            request_list: sameDayRequests
        });
    } catch (error: any) {
        return NextResponse.json({
            status: 500,
            error: error.message
        });
    }
}