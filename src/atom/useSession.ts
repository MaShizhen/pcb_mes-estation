import { useState } from 'react';

export default function useSession() {
	return useState(null);
}