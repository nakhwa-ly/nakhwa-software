import { NextRequest, NextResponse } from 'next/server';
import { contactFormSchema } from '@/lib/validations';
import { ZodError } from 'zod';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = contactFormSchema.parse(body);

    console.log('📩 New contact form submission:', JSON.stringify(validated, null, 2));

    // TODO: wire Resend email here in production (see 08-contact-form-spec.md)

    return NextResponse.json(
      { success: true, message: 'تم استلام رسالتك' },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { success: false, message: 'بيانات غير صحيحة', errors: error.flatten().fieldErrors },
        { status: 422 }
      );
    }
    console.error('Contact form error:', error);
    return NextResponse.json(
      { success: false, message: 'حدث خطأ في الخادم' },
      { status: 500 }
    );
  }
}
