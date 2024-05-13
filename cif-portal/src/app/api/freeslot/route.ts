import Request from "@/models/RequestModel"
import {NextRequest, NextResponse} from "next/server";
import { connect } from "@/dbConfig/dbConfig";
connect();

export async function POST(request : NextRequest) {
    try {
        const req_body = await request.json()
        const { date } = req_body
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
              $expr: {
                $and: [
                  { $eq: ['$startDay', '$endDay'] },
                  { $eq: ['$startMonth', '$endMonth'] },
                  { $eq: ['$startYear', '$endYear'] },
                ],
              },
            },
          }]);

        console.log(sameDayRequests);

        return NextResponse.json({
            status: 200,
            "request_list": sameDayRequests
        })
    } catch (error: any) {
        return NextResponse.json({
            status: 500,
            error: error.message
        })
    }
}